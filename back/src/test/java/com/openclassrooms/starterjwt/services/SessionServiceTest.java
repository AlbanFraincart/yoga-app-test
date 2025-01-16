package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

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

    @Test
    void delete_shouldCallDeleteById() {
        // Arrange
        Long sessionId = 1L;

        // Act
        sessionService.delete(sessionId);

        // Assert
        verify(sessionRepository, times(1)).deleteById(sessionId);
    }

    @Test
    void update_shouldSaveUpdatedSession() {
        // Arrange
        Long sessionId = 1L;
        Session updatedSession = new Session();
        updatedSession.setName("Updated Name");

        when(sessionRepository.save(updatedSession)).thenReturn(updatedSession);

        // Act
        Session result = sessionService.update(sessionId, updatedSession);

        // Assert
        assertNotNull(result);
        assertEquals("Updated Name", result.getName());
        verify(sessionRepository, times(1)).save(updatedSession);
    }

    @Test
    void participate_shouldAddUserToSessionAndSave() {
        // Arrange
        Long sessionId = 1L;
        Long userId = 2L;

        User mockUser = new User();
        mockUser.setId(userId);

        Session mockSession = new Session();
        mockSession.setId(sessionId);
        mockSession.setUsers(new ArrayList<>());

        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(mockSession));
        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        // Act
        sessionService.participate(sessionId, userId);

        // Assert
        assertTrue(mockSession.getUsers().contains(mockUser), "L'utilisateur doit être ajouté à la session");
        verify(sessionRepository, times(1)).save(mockSession);
    }


    @Test
    void participate_shouldThrowNotFoundException_whenSessionNotFound() {
        // Arrange
        Long sessionId = 1L;
        Long userId = 2L;

        when(sessionRepository.findById(sessionId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(NotFoundException.class, () -> sessionService.participate(sessionId, userId));
    }

    @Test
    void participate_shouldThrowBadRequestException_whenUserAlreadyParticipates() {
        // Arrange
        Long sessionId = 1L;
        Long userId = 2L;

        User mockUser = new User();
        mockUser.setId(userId);

        Session mockSession = new Session();
        mockSession.setId(sessionId);
        mockSession.setUsers(Arrays.asList(mockUser));

        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(mockSession));
        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));

        // Act & Assert
        assertThrows(BadRequestException.class, () -> sessionService.participate(sessionId, userId));

        verify(sessionRepository, times(1)).findById(sessionId);
        verify(userRepository, times(1)).findById(userId);
    }


    @Test
    void noLongerParticipate_shouldThrowNotFoundException_whenSessionNotFound() {
        // Arrange
        Long sessionId = 1L;
        Long userId = 2L;

        when(sessionRepository.findById(sessionId)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(NotFoundException.class, () -> sessionService.noLongerParticipate(sessionId, userId));
    }

    @Test
    void noLongerParticipate_shouldThrowBadRequestException_whenUserDoesNotParticipate() {
        // Arrange
        Long sessionId = 1L;
        Long userId = 2L;

        User mockUser = new User();
        mockUser.setId(userId);

        Session mockSession = new Session();
        mockSession.setId(sessionId);
        mockSession.setUsers(Arrays.asList()); // L'utilisateur ne participe pas

        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(mockSession));

        // Act & Assert
        assertThrows(BadRequestException.class, () -> sessionService.noLongerParticipate(sessionId, userId));

        verify(sessionRepository, times(1)).findById(sessionId);
    }

    @Test
    void noLongerParticipate_shouldRemoveUserFromSessionAndSave() {
        // Arrange
        Long sessionId = 1L;
        Long userId = 2L;

        User mockUser = new User();
        mockUser.setId(userId);

        Session mockSession = new Session();
        mockSession.setId(sessionId);
        mockSession.setUsers(Arrays.asList(mockUser)); // L'utilisateur participe

        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(mockSession));

        // Act
        sessionService.noLongerParticipate(sessionId, userId);

        // Assert
        assertFalse(mockSession.getUsers().contains(mockUser), "L'utilisateur doit être retiré de la session");
        verify(sessionRepository, times(1)).save(mockSession);
    }


    @Test
    void findAll_shouldReturnAllSessions() {
        // Arrange
        List<Session> mockSessions = Arrays.asList(
                new Session().setId(1L).setName("Session 1"),
                new Session().setId(2L).setName("Session 2")
        );
        when(sessionRepository.findAll()).thenReturn(mockSessions);

        // Act
        List<Session> result = sessionService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(sessionRepository, times(1)).findAll();
    }

}
