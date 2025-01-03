package com.openclassrooms.starterjwt.dto;

import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class SessionDtoTest {

    private final Validator validator;

    public SessionDtoTest() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        this.validator = factory.getValidator();
    }

    @Test
    void sessionDto_shouldBeValid() {
        // Arrange
        SessionDto sessionDto = new SessionDto(
                1L,
                "Yoga Session",
                new Date(),
                1L,
                "This is a description of the session.",
                new ArrayList<>(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        // Act
        Set<ConstraintViolation<SessionDto>> violations = validator.validate(sessionDto);

        // Assert
        assertTrue(violations.isEmpty(), "Expected no validation errors");
    }

    @Test
    void sessionDto_shouldFailValidationForBlankName() {
        // Arrange
        SessionDto sessionDto = new SessionDto(
                1L,
                "",
                new Date(),
                1L,
                "This is a description of the session.",
                new ArrayList<>(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        // Act
        Set<ConstraintViolation<SessionDto>> violations = validator.validate(sessionDto);

        // Assert
        assertFalse(violations.isEmpty(), "Expected validation error for blank name");
    }

    @Test
    void sessionDto_shouldFailValidationForNullDate() {
        // Arrange
        SessionDto sessionDto = new SessionDto(
                1L,
                "Yoga Session",
                null,
                1L,
                "This is a description of the session.",
                new ArrayList<>(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        // Act
        Set<ConstraintViolation<SessionDto>> violations = validator.validate(sessionDto);

        // Assert
        assertFalse(violations.isEmpty(), "Expected validation error for null date");
    }

    @Test
    void sessionDto_shouldFailValidationForNullTeacherId() {
        // Arrange
        SessionDto sessionDto = new SessionDto(
                1L,
                "Yoga Session",
                new Date(),
                null,
                "This is a description of the session.",
                new ArrayList<>(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        // Act
        Set<ConstraintViolation<SessionDto>> violations = validator.validate(sessionDto);

        // Assert
        assertFalse(violations.isEmpty(), "Expected validation error for null teacher_id");
    }

    @Test
    void sessionDto_shouldFailValidationForLongDescription() {
        // Arrange
        StringBuilder longDescription = new StringBuilder();
        for (int i = 0; i < 2501; i++) {
            longDescription.append("a");
        }

        SessionDto sessionDto = new SessionDto(
                1L,
                "Yoga Session",
                new Date(),
                1L,
                longDescription.toString(),
                new ArrayList<>(),
                LocalDateTime.now(),
                LocalDateTime.now()
        );

        // Act
        Set<ConstraintViolation<SessionDto>> violations = validator.validate(sessionDto);

        // Assert
        assertFalse(violations.isEmpty(), "Expected validation error for description exceeding 2500 characters");
    }
}
