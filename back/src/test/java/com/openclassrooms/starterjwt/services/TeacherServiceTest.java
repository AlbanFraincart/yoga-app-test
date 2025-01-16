package com.openclassrooms.starterjwt.services;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TeacherServiceTest {

    @Mock
    private TeacherRepository teacherRepository;

    @InjectMocks
    private TeacherService teacherService;

    @Test
    void findAll_shouldReturnListOfTeachers() {
        // Arrange
        List<Teacher> mockTeachers = Arrays.asList(
                Teacher.builder().id(1L).lastName("John").firstName("Doe").build(),
                Teacher.builder().id(2L).lastName("Jane").firstName("Smith").build()
        );



        when(teacherRepository.findAll()).thenReturn(mockTeachers);

        // Act
        List<Teacher> result = teacherService.findAll();

        // Assert
        assertEquals(2, result.size());
        verify(teacherRepository, times(1)).findAll();
    }

    @Test
    void findById_shouldReturnTeacher_whenTeacherExists() {
        // Arrange
        Teacher mockTeacher = Teacher.builder().id(1L).lastName("John").firstName("Doe").build();

        when(teacherRepository.findById(1L)).thenReturn(Optional.of(mockTeacher));

        // Act
        Teacher result = teacherService.findById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("John", result.getLastName());
        assertEquals("Doe", result.getFirstName());
        verify(teacherRepository, times(1)).findById(1L);
    }


    @Test
    void findById_shouldReturnNull_whenTeacherDoesNotExist() {
        // Arrange
        when(teacherRepository.findById(99L)).thenReturn(Optional.empty());

        // Act
        Teacher result = teacherService.findById(99L);

        // Assert
        assertNull(result);
        verify(teacherRepository, times(1)).findById(99L);
    }


    @Test
    void findAll_shouldReturnEmptyList_whenNoTeachersExist() {
        // Arrange
        when(teacherRepository.findAll()).thenReturn(Arrays.asList());

        // Act
        List<Teacher> result = teacherService.findAll();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());
        verify(teacherRepository, times(1)).findAll();
    }

    @Test
    void findAll_shouldReturnAllTeachers() {
        // Arrange
        List<Teacher> mockTeachers = Arrays.asList(
                Teacher.builder().id(1L).lastName("John").firstName("Doe").build(),
                Teacher.builder().id(2L).lastName("Jane").firstName("Smith").build()
        );

        when(teacherRepository.findAll()).thenReturn(mockTeachers);

        // Act
        List<Teacher> result = teacherService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("John", result.get(0).getLastName());
        assertEquals("Jane", result.get(1).getLastName());
        verify(teacherRepository, times(1)).findAll();
    }

}
