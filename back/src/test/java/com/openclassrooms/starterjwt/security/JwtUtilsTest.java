package com.openclassrooms.starterjwt.security;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Collection;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.util.ReflectionTestUtils;

import com.openclassrooms.starterjwt.security.jwt.JwtUtils;
import com.openclassrooms.starterjwt.security.services.UserDetailsImpl;

class JwtUtilsTest {
    private JwtUtils jwtUtils;
    private final String secret = "mySecretKey1234567890"; // clé secrète de test
    private final int expirationMs = 3600000; // 1 heure en millisecondes

    @BeforeEach
    void setUp() {
        jwtUtils = new JwtUtils();
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret", secret);
        ReflectionTestUtils.setField(jwtUtils, "jwtExpirationMs", expirationMs);
        SecurityContextHolder.clearContext();
    }

    @Test
    void testGenerateAndParseJwtToken() {
        // Créer un mock de UserDetailsImpl
        UserDetailsImpl userDetails = mock(UserDetailsImpl.class);
        when(userDetails.getUsername()).thenReturn("testuser@example.com");
        when(userDetails.getPassword()).thenReturn("password");
        when(userDetails.getAuthorities()).thenReturn(new ArrayList<>());  // Option A

        // Créer une authentification factice utilisant le mock
        Authentication auth = new Authentication() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return userDetails.getAuthorities();
            }
            @Override
            public Object getCredentials() {
                return userDetails.getPassword();
            }
            @Override
            public Object getDetails() {
                return null;
            }
            @Override
            public Object getPrincipal() {
                return userDetails;
            }
            @Override
            public boolean isAuthenticated() {
                return true;
            }
            @Override
            public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {}
            @Override
            public String getName() {
                return userDetails.getUsername();
            }
        };

        // Générer un token JWT
        String token = jwtUtils.generateJwtToken(auth);
        assertNotNull(token, "Le token ne doit pas être nul");

        // Récupérer le nom d'utilisateur à partir du token
        String username = jwtUtils.getUserNameFromJwtToken(token);
        assertEquals(userDetails.getUsername(), username, "Le nom d'utilisateur doit correspondre");

        // Valider le token généré
        assertTrue(jwtUtils.validateJwtToken(token), "Le token généré doit être valide");
    }

    @Test
    void testValidateJwtToken_withInvalidToken() {
        // Utiliser un token invalide pour tester la validation
        String invalidToken = "invalid.token.value";
        assertFalse(jwtUtils.validateJwtToken(invalidToken), "Le token invalide ne doit pas être validé");
    }
}
