package com.openclassrooms.starterjwt.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.time.LocalDateTime;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class TeacherTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void testValidTeacher() {
        // Arrange
        Teacher teacher = Teacher.builder()
                .id(1L)
                .lastName("Doe")
                .firstName("John")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // Act
        Set<ConstraintViolation<Teacher>> violations = validator.validate(teacher);

        // Assert
        assertThat(violations).isEmpty();
    }

    @Test
    void testInvalidTeacher_blankLastName() {
        // Arrange
        Teacher teacher = Teacher.builder()
                .id(1L)
                .lastName("") // Blank last name
                .firstName("John")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // Act
        Set<ConstraintViolation<Teacher>> violations = validator.validate(teacher);

        // Assert
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("lastName"));
    }

    @Test
    void testInvalidTeacher_blankFirstName() {
        // Arrange
        Teacher teacher = Teacher.builder()
                .id(1L)
                .lastName("Doe")
                .firstName("") // Blank first name
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // Act
        Set<ConstraintViolation<Teacher>> violations = validator.validate(teacher);

        // Assert
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("firstName"));
    }

    @Test
    void testInvalidTeacher_longLastName() {
        // Arrange
        String longLastName = new String(new char[25]).replace("\0", "A"); // 25 characters
        Teacher teacher = Teacher.builder()
                .id(1L)
                .lastName(longLastName)
                .firstName("John")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // Act
        Set<ConstraintViolation<Teacher>> violations = validator.validate(teacher);

        // Assert
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("lastName"));
    }

    @Test
    void testInvalidTeacher_longFirstName() {
        // Arrange
        String longFirstName = new String(new char[25]).replace("\0", "A"); // 25 characters
        Teacher teacher = Teacher.builder()
                .id(1L)
                .lastName("Doe")
                .firstName(longFirstName)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // Act
        Set<ConstraintViolation<Teacher>> violations = validator.validate(teacher);

        // Assert
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("firstName"));
    }
}
