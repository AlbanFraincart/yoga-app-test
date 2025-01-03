package com.openclassrooms.starterjwt.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.time.LocalDateTime;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

class SessionTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void testValidSession() {
        // Arrange
        Session session = Session.builder()
                .id(1L)
                .name("Yoga Session")
                .date(new Date())
                .description("A detailed description about the yoga session.")
                .teacher(Mockito.mock(Teacher.class))
                .users(new ArrayList<>())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // Act
        Set<ConstraintViolation<Session>> violations = validator.validate(session);

        // Assert
        assertThat(violations).isEmpty();
    }

    @Test
    void testInvalidSession_blankName() {
        // Arrange
        Session session = Session.builder()
                .id(1L)
                .name("") // Invalid: Blank name
                .date(new Date())
                .description("A detailed description about the yoga session.")
                .teacher(Mockito.mock(Teacher.class))
                .users(new ArrayList<>())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // Act
        Set<ConstraintViolation<Session>> violations = validator.validate(session);

        // Assert
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("name"));
    }

    @Test
    void testInvalidSession_nullDate() {
        // Arrange
        Session session = Session.builder()
                .id(1L)
                .name("Yoga Session")
                .date(null) // Invalid: Null date
                .description("A detailed description about the yoga session.")
                .teacher(Mockito.mock(Teacher.class))
                .users(new ArrayList<>())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // Act
        Set<ConstraintViolation<Session>> violations = validator.validate(session);

        // Assert
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("date"));
    }

    @Test
    void testInvalidSession_longDescription() {
        // Arrange
        String longDescription = new String(new char[3000]).replace("\0", "A"); // Génère une chaîne de 3000 'A'
        Session session = Session.builder()
                .id(1L)
                .name("Yoga Session")
                .date(new Date())
                .description(longDescription)
                .teacher(Mockito.mock(Teacher.class))
                .users(new ArrayList<>())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        // Act
        Set<ConstraintViolation<Session>> violations = validator.validate(session);

        // Assert
        assertThat(violations).isNotEmpty();
        assertThat(violations).anyMatch(v -> v.getPropertyPath().toString().equals("description"));
    }


    @Test
    void testEqualsAndHashCode() {
        // Arrange
        Session session1 = Session.builder().id(1L).build();
        Session session2 = Session.builder().id(1L).build();
        Session session3 = Session.builder().id(2L).build();

        // Assert
        assertThat(session1).isEqualTo(session2);
        assertThat(session1).isNotEqualTo(session3);
    }

    @Test
    void testToString() {
        // Arrange
        Session session = Session.builder()
                .id(1L)
                .name("Yoga Session")
                .build();

        // Act
        String toString = session.toString();

        // Assert
        assertThat(toString).contains("Yoga Session");
    }
}
