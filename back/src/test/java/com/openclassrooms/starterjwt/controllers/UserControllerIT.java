package com.openclassrooms.starterjwt.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.dto.UserDto;
import com.openclassrooms.starterjwt.mapper.UserMapper;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserController userController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();

        objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();
    }


    @Test
    void findById_shouldReturnUser() throws Exception {
        // Arrange
        Long userId = 1L;
        User user = new User(userId, "email@example.com", "Doe", "John", "password", false, LocalDateTime.now(), LocalDateTime.now());
        UserDto userDto = new UserDto(userId, "email@example.com", "Doe", "John", false, null, LocalDateTime.now(), LocalDateTime.now());

        when(userService.findById(userId)).thenReturn(user);
        when(userMapper.toDto(user)).thenReturn(userDto);

        // Act & Assert
        mockMvc.perform(get("/api/user/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(userDto)));

        verify(userService, times(1)).findById(userId);
    }

    @Test
    void findById_shouldReturnNotFound() throws Exception {
        // Arrange
        Long userId = 1L;

        when(userService.findById(userId)).thenReturn(null);

        // Act & Assert
        mockMvc.perform(get("/api/user/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        verify(userService, times(1)).findById(userId);
    }

    @Test
    void findById_shouldReturnBadRequestForInvalidId() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/user/{id}", "invalid-id")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());

        verify(userService, never()).findById(anyLong());
    }

    @Test
    void delete_shouldReturnOkForAuthorizedUser() throws Exception {
        // Arrange
        Long userId = 1L;
        User user = new User(userId, "email@example.com", "Doe", "John", "password", false, LocalDateTime.now(), LocalDateTime.now());

        when(userService.findById(userId)).thenReturn(user);

        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("email@example.com");

        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(userDetails);

        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        SecurityContextHolder.setContext(securityContext);

        // Act & Assert
        mockMvc.perform(delete("/api/user/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(userService, times(1)).delete(userId);
    }

    @Test
    void delete_shouldReturnUnauthorizedForDifferentUser() throws Exception {
        // Arrange
        Long userId = 1L;
        User user = new User(userId, "email@example.com", "Doe", "John", "password", false, LocalDateTime.now(), LocalDateTime.now());

        when(userService.findById(userId)).thenReturn(user);

        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn("different@example.com");

        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(userDetails);

        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);

        SecurityContextHolder.setContext(securityContext);

        // Act & Assert
        mockMvc.perform(delete("/api/user/{id}", userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());

        verify(userService, never()).delete(userId);
    }

    @Test
    void delete_shouldReturnBadRequestForInvalidId() throws Exception {
        // Act & Assert
        mockMvc.perform(delete("/api/user/{id}", "invalid-id")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());

        verify(userService, never()).delete(anyLong());
    }
}
