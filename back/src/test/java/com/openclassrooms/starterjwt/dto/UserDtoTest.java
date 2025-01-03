package com.openclassrooms.starterjwt.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.time.LocalDateTime;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class UserDtoTest {

    private final Validator validator;

    UserDtoTest() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void testValidUserDto() {
        // Arrange
        UserDto userDto = new UserDto(
                1L,
                "email@example.com",
                "Doe",
                "John",
                true,
                "password123",
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        // Act
        Set<ConstraintViolation<UserDto>> violations = validator.validate(userDto);

        // Assert
        assertThat(violations).isEmpty();
    }


    @Test
    void testInvalidUserDto_invalidEmailFormat() {
        // Arrange
        UserDto userDto = new UserDto(
                1L,
                "invalid-email",
                "Doe",
                "John",
                true,
                "password123",
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        // Act
        Set<ConstraintViolation<UserDto>> violations = validator.validate(userDto);

        // Assert
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("email"));
    }

    @Test
    void testJsonSerialization() throws Exception {
        // Arrange
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        UserDto userDto = new UserDto(
                1L,
                "email@example.com",
                "Doe",
                "John",
                true,
                "password123",
                LocalDateTime.of(2023, 1, 1, 10, 0, 0),
                LocalDateTime.of(2023, 1, 2, 15, 30, 0)
        );

        // Act
        String json = objectMapper.writeValueAsString(userDto);

        // Assert
        String expectedJson = "{\"id\":1,\"email\":\"email@example.com\",\"lastName\":\"Doe\","
                + "\"firstName\":\"John\",\"admin\":true,\"createdAt\":\"2023-01-01T10:00:00\","
                + "\"updatedAt\":\"2023-01-02T15:30:00\"}";
        assertThat(json).isEqualTo(expectedJson);
    }

    @Test
    void testJsonDeserialization() throws Exception {
        // Arrange
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        String json = "{\"id\":1,\"email\":\"email@example.com\",\"lastName\":\"Doe\","
                + "\"firstName\":\"John\",\"admin\":true,\"createdAt\":\"2023-01-01T10:00:00\","
                + "\"updatedAt\":\"2023-01-02T15:30:00\"}";

        // Act
        UserDto userDto = objectMapper.readValue(json, UserDto.class);

        // Assert
        assertThat(userDto.getId()).isEqualTo(1L);
        assertThat(userDto.getEmail()).isEqualTo("email@example.com");
        assertThat(userDto.getLastName()).isEqualTo("Doe");
        assertThat(userDto.getFirstName()).isEqualTo("John");
        assertThat(userDto.isAdmin()).isTrue();
        assertThat(userDto.getCreatedAt()).isEqualTo(LocalDateTime.of(2023, 1, 1, 10, 0, 0));
        assertThat(userDto.getUpdatedAt()).isEqualTo(LocalDateTime.of(2023, 1, 2, 15, 30, 0));
    }

}
