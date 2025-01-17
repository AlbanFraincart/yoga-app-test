package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.services.SessionService;
import com.openclassrooms.starterjwt.mapper.SessionMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Collections;
import java.util.Date;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class SessionControllerIT {

    private MockMvc mockMvc;

    @Mock
    private SessionService sessionService;

    @Mock
    private SessionMapper sessionMapper;

    @InjectMocks
    private SessionController sessionController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(sessionController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void findAll_shouldReturnListOfSessions() throws Exception {
        // Arrange
        Session session = new Session();
        SessionDto sessionDto = new SessionDto();
        sessionDto.setName("Yoga Session");
        sessionDto.setDescription("A relaxing yoga session.");
        sessionDto.setDate(new Date());
        sessionDto.setTeacher_id(1L);

        when(sessionService.findAll()).thenReturn(Collections.singletonList(session));
        when(sessionMapper.toDto(anyList())).thenReturn(Collections.singletonList(sessionDto));

        // Act & Assert
        mockMvc.perform(get("/api/session")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(Collections.singletonList(sessionDto))));

        verify(sessionService, times(1)).findAll();
    }

    @Test
    void create_shouldReturnCreatedSession() throws Exception {
        // Arrange
        SessionDto sessionDto = new SessionDto();
        sessionDto.setName("Yoga Session");
        sessionDto.setDescription("A relaxing yoga session.");
        sessionDto.setDate(new Date());
        sessionDto.setTeacher_id(1L);

        Session session = new Session();

        when(sessionMapper.toEntity(any(SessionDto.class))).thenReturn(session);
        when(sessionService.create(any(Session.class))).thenReturn(session);
        when(sessionMapper.toDto(any(Session.class))).thenReturn(sessionDto);

        // Act & Assert
        mockMvc.perform(post("/api/session")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sessionDto)))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(sessionDto)));

        verify(sessionService, times(1)).create(any(Session.class));
    }

    @Test
    void findById_shouldReturnSession() throws Exception {
        // Arrange
        Long sessionId = 1L;
        Session session = new Session();
        SessionDto sessionDto = new SessionDto();
        sessionDto.setId(sessionId);
        sessionDto.setName("Yoga Session");
        sessionDto.setDescription("A relaxing yoga session.");
        sessionDto.setDate(new Date());
        sessionDto.setTeacher_id(1L);

        when(sessionService.getById(sessionId)).thenReturn(session);
        when(sessionMapper.toDto(session)).thenReturn(sessionDto);

        // Act & Assert
        mockMvc.perform(get("/api/session/{id}", sessionId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(sessionDto)));

        verify(sessionService, times(1)).getById(sessionId);
    }



    @Test
    void participate_shouldReturnOkStatus() throws Exception {
        // Arrange
        Long sessionId = 1L;
        Long userId = 2L;

        doNothing().when(sessionService).participate(sessionId, userId);

        // Act & Assert
        mockMvc.perform(post("/api/session/{id}/participate/{userId}", sessionId, userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(sessionService, times(1)).participate(sessionId, userId);
    }

    @Test
    void noLongerParticipate_shouldReturnOkStatus() throws Exception {
        // Arrange
        Long sessionId = 1L;
        Long userId = 2L;

        doNothing().when(sessionService).noLongerParticipate(sessionId, userId);

        // Act & Assert
        mockMvc.perform(delete("/api/session/{id}/participate/{userId}", sessionId, userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(sessionService, times(1)).noLongerParticipate(sessionId, userId);
    }


}
