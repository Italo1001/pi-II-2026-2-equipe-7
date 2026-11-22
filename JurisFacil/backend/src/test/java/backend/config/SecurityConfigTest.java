package backend.config;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.mock.web.MockHttpServletRequest;

class SecurityConfigTest {

    @Test
    void corsPermiteOrigemConfigurada() {
        SecurityConfig config = new SecurityConfig();
        config.setAllowedOrigins("https://jurisfacil.example.com, http://localhost:5173");

        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/termos");
        var cors = config.corsConfigurationSource().getCorsConfiguration(request);

        assertEquals(
            List.of("https://jurisfacil.example.com", "http://localhost:5173"),
            cors.getAllowedOrigins()
        );
        assertTrue(cors.getAllowCredentials());
    }

    @Test
    void claimDeAdministradorEConvertidaEmAutoridadeAdmin() {
        Jwt jwt = Jwt.withTokenValue("token")
            .header("alg", "HS256")
            .subject("1")
            .claim("roles", List.of("ADMIN"))
            .build();

        var authentication = new SecurityConfig().jwtAuthenticationConverter().convert(jwt);

        assertTrue(authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")));
    }
}
