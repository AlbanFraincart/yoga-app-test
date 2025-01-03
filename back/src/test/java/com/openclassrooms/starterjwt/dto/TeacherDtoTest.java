package com.openclassrooms.starterjwt.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.time.LocalDateTime;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class TeacherDtoTest {

    private final Validator validator;

    TeacherDtoTest() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void testValidTeacherDto() {
        // Arrange
        TeacherDto teacherDto = new TeacherDto(
                1L,
                "Doe",
                "John",
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        // Act
        Set<ConstraintViolation<TeacherDto>> violations = validator.validate(teacherDto);

        // Assert
        assertThat(violations).isEmpty();
    }

    @Test
    void testInvalidTeacherDto_blankLastName() {
        // Arrange
        TeacherDto teacherDto = new TeacherDto(
                1L,
                "",
                "John",
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        // Act
        Set<ConstraintViolation<TeacherDto>> violations = validator.validate(teacherDto);

        // Assert
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("lastName"));
    }

    @Test
    void testInvalidTeacherDto_blankFirstName() {
        // Arrange
        TeacherDto teacherDto = new TeacherDto(
                1L,
                "Doe",
                "",
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        // Act
        Set<ConstraintViolation<TeacherDto>> violations = validator.validate(teacherDto);

        // Assert
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("firstName"));
    }

    @Test
    void testJsonSerialization() throws Exception {
        // Arrange
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();
        TeacherDto teacherDto = new TeacherDto(
                1L,
                "Doe",
                "John",
                LocalDateTime.of(2023, 1, 1, 10, 0, 0),
                LocalDateTime.of(2023, 1, 2, 15, 30, 0)
        );

        // Act
        String json = objectMapper.writeValueAsString(teacherDto);

        // Assert
        String expectedJson = "{\"id\":1,\"lastName\":\"Doe\",\"firstName\":\"John\","
                + "\"createdAt\":\"2023-01-01T10:00:00\",\"updatedAt\":\"2023-01-02T15:30:00\"}";
        assertThat(json).isEqualTo(expectedJson);
    }

    @Test
    void testJsonDeserialization() throws Exception {
        // Arrange
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();
        String json = "{\"id\":1,\"lastName\":\"Doe\",\"firstName\":\"John\","
                + "\"createdAt\":\"2023-01-01T10:00:00\",\"updatedAt\":\"2023-01-02T15:30:00\"}";

        // Act
        TeacherDto teacherDto = objectMapper.readValue(json, TeacherDto.class);

        // Assert
        assertThat(teacherDto.getId()).isEqualTo(1L);
        assertThat(teacherDto.getLastName()).isEqualTo("Doe");
        assertThat(teacherDto.getFirstName()).isEqualTo("John");
        assertThat(teacherDto.getCreatedAt()).isEqualTo(LocalDateTime.of(2023, 1, 1, 10, 0, 0));
        assertThat(teacherDto.getUpdatedAt()).isEqualTo(LocalDateTime.of(2023, 1, 2, 15, 30, 0));
    }

}
