package com.openclassrooms.starterjwt.security;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Collection;

import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

class UserDetailsImplTest {

    @Test
    void testGettersAndEquals() {
        // Création de deux instances identiques via le builder
        UserDetailsImpl user1 = UserDetailsImpl.builder()
                .id(1L)
                .username("user")
                .firstName("John")
                .lastName("Doe")
                .admin(false)
                .password("password")
                .build();

        UserDetailsImpl user2 = UserDetailsImpl.builder()
                .id(1L)
                .username("user")
                .firstName("John")
                .lastName("Doe")
                .admin(false)
                .password("password")
                .build();

        // Création d'une instance différente
        UserDetailsImpl user3 = UserDetailsImpl.builder()
                .id(2L)
                .username("otherUser")
                .firstName("Jane")
                .lastName("Doe")
                .admin(true)
                .password("pass")
                .build();

        // Vérification des getters (optionnel, car Lombok génère ces méthodes)
        assertEquals("user", user1.getUsername());
        assertEquals("John", user1.getFirstName());
        assertEquals("Doe", user1.getLastName());
        assertFalse(user1.getAdmin());
        assertEquals("password", user1.getPassword());

        // Vérification de la logique d'égalité basée sur l'ID
        assertEquals(user1, user2, "Les utilisateurs avec le même ID devraient être égaux");
        assertNotEquals(user1, user3, "Les utilisateurs avec des IDs différents ne devraient pas être égaux");

        // Vérification du comportement de getAuthorities()
        Collection<? extends GrantedAuthority> authorities = user1.getAuthorities();
        assertNotNull(authorities, "La collection d'autorisations ne doit pas être nulle");
        assertTrue(authorities.isEmpty(), "La collection d'autorisations devrait être vide");

        // Vérification des méthodes de statut de compte
        assertTrue(user1.isAccountNonExpired(), "Le compte ne doit pas être expiré");
        assertTrue(user1.isAccountNonLocked(), "Le compte ne doit pas être bloqué");
        assertTrue(user1.isCredentialsNonExpired(), "Les identifiants ne doivent pas être expirés");
        assertTrue(user1.isEnabled(), "Le compte doit être activé");
    }
}
