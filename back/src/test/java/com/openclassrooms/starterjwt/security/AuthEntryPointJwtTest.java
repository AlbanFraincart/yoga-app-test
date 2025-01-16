package com.openclassrooms.starterjwt.security;

import static org.junit.jupiter.api.Assertions.*;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.openclassrooms.starterjwt.security.jwt.AuthEntryPointJwt;
import org.springframework.security.core.AuthenticationException;

class AuthEntryPointJwtTest {

    @Test
    void testCommence() throws Exception {
        AuthEntryPointJwt entryPoint = new AuthEntryPointJwt();

        // Création d'une requête et d'une réponse simulées
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setServletPath("/test/path");

        MockHttpServletResponse response = new MockHttpServletResponse();

        // Création d'une exception d'authentification factice
        AuthenticationException authException = new AuthenticationException("Test unauthorized") {};

        // Appel de la méthode à tester
        entryPoint.commence(request, response, authException);

        // Vérification du type de contenu et du statut HTTP
        assertEquals(MediaType.APPLICATION_JSON_VALUE, response.getContentType());
        assertEquals(HttpServletResponse.SC_UNAUTHORIZED, response.getStatus());

        // Récupération et analyse du contenu JSON de la réponse
        String content = response.getContentAsString();
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> body = mapper.readValue(content, Map.class);

        // Vérification que le corps de la réponse contient les bonnes valeurs
        assertEquals(HttpServletResponse.SC_UNAUTHORIZED, body.get("status"));
        assertEquals("Unauthorized", body.get("error"));
        assertEquals("Test unauthorized", body.get("message"));
        assertEquals("/test/path", body.get("path"));
    }
}
