package com.openclassrooms.starterjwt.payload;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import com.openclassrooms.starterjwt.payload.request.SignupRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


class SignupRequestTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        // Initialisation du validateur
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void testValidSignupRequest() {
        // Création d'un objet SignupRequest valide
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setEmail("test@example.com");
        signupRequest.setFirstName("John");
        signupRequest.setLastName("Doe");
        signupRequest.setPassword("password123");

        // Validation
        Set<ConstraintViolation<SignupRequest>> violations = validator.validate(signupRequest);

        // Aucune violation ne devrait être détectée
        assertTrue(violations.isEmpty(), "Le SignupRequest valide ne doit pas avoir de violations");
    }

    @Test
    void equals_shouldReturnTrueForSameProperties() {
        // Arrange
        SignupRequest request1 = new SignupRequest();
        request1.setEmail("test@example.com");
        request1.setFirstName("John");
        request1.setLastName("Doe");
        request1.setPassword("password123");

        SignupRequest request2 = new SignupRequest();
        request2.setEmail("test@example.com");
        request2.setFirstName("John");
        request2.setLastName("Doe");
        request2.setPassword("password123");

        // Act & Assert
        assertEquals(request1, request2, "Objects with the same properties should be equal");
    }

    @Test
    void equals_shouldReturnFalseForDifferentProperties() {
        // Arrange
        SignupRequest request1 = new SignupRequest();
        request1.setEmail("test@example.com");
        request1.setFirstName("John");
        request1.setLastName("Doe");
        request1.setPassword("password123");

        SignupRequest request2 = new SignupRequest();
        request2.setEmail("different@example.com");
        request2.setFirstName("Jane");
        request2.setLastName("Smith");
        request2.setPassword("differentPassword");

        // Act & Assert
        assertNotEquals(request1, request2, "Objects with different properties should not be equal");
    }

    @Test
    void hashCode_shouldReturnSameValueForEqualObjects() {
        // Arrange
        SignupRequest request1 = new SignupRequest();
        request1.setEmail("test@example.com");
        request1.setFirstName("John");
        request1.setLastName("Doe");
        request1.setPassword("password123");

        SignupRequest request2 = new SignupRequest();
        request2.setEmail("test@example.com");
        request2.setFirstName("John");
        request2.setLastName("Doe");
        request2.setPassword("password123");

        // Act & Assert
        assertEquals(request1.hashCode(), request2.hashCode(), "Equal objects should have the same hash code");
    }

    @Test
    void hashCode_shouldReturnDifferentValueForDifferentObjects() {
        // Arrange
        SignupRequest request1 = new SignupRequest();
        request1.setEmail("test@example.com");
        request1.setFirstName("John");
        request1.setLastName("Doe");
        request1.setPassword("password123");

        SignupRequest request2 = new SignupRequest();
        request2.setEmail("different@example.com");
        request2.setFirstName("Jane");
        request2.setLastName("Smith");
        request2.setPassword("differentPassword");

        // Act & Assert
        assertNotEquals(request1.hashCode(), request2.hashCode(), "Different objects should have different hash codes");
    }


}
