package com.openclassrooms.starterjwt;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SessionServiceTest {

    @Mock
    private SessionRepository sessionRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private SessionService sessionService;

    @BeforeEach
    void setUp() {
//        MockitoAnnotations.openMocks(this); // Initialise les mocks
    }

    @Test
    void getById_shouldReturnSession_whenSessionExists() {
        // Arrange
        Session mockSession = new Session();
        mockSession.setId(1L);
        mockSession.setName("Yoga Session");

        when(sessionRepository.findById(1L)).thenReturn(Optional.of(mockSession));

        // Act
        Session result = sessionService.getById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Yoga Session", result.getName());

        verify(sessionRepository, times(1)).findById(1L);
    }


    @Test
    void create_shouldSaveAndReturnSession() {
        // Arrange
        Session mockSession = new Session();
        mockSession.setName("New Session");

        when(sessionRepository.save(mockSession)).thenReturn(mockSession);

        // Act
        Session result = sessionService.create(mockSession);

        // Assert
        assertNotNull(result);
        assertEquals("New Session", result.getName());
        verify(sessionRepository, times(1)).save(mockSession);
    }



}
