package backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Duration;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtEncoder;

import backend.dto.LoginRequest;
import backend.exception.CredenciaisInvalidasException;
import backend.model.Administrador;
import backend.repository.AdministradorRepository;

class AuthServiceTest {

    @Test
    void loginValidoRetornaTokenEInformacoesPublicasDoAdministrador() {
        AdministradorRepository repository = mock(AdministradorRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        JwtEncoder jwtEncoder = mock(JwtEncoder.class);
        AuthService authService = new AuthService(repository, passwordEncoder, jwtEncoder, Duration.ofHours(1));

        Administrador administrador = new Administrador();
        administrador.setId(7L);
        administrador.setNome("Administradora");
        administrador.setEmail("admin@jurisfacil.com");
        administrador.setSenha("$2a$10$hash");

        when(repository.findByEmailIgnoreCase("admin@jurisfacil.com")).thenReturn(Optional.of(administrador));
        when(passwordEncoder.matches("senha-segura", administrador.getSenha())).thenReturn(true);
        when(jwtEncoder.encode(any())).thenReturn(
            Jwt.withTokenValue("token-assinado")
                .header("alg", "HS256")
                .claim("sub", "7")
                .build()
        );

        var resposta = authService.login(new LoginRequest(" Admin@JurisFacil.com ", "senha-segura"));

        assertEquals("token-assinado", resposta.token());
        assertEquals(7L, resposta.administrador().id());
        assertEquals("Administradora", resposta.administrador().nome());
        assertEquals("admin@jurisfacil.com", resposta.administrador().email());
        verify(passwordEncoder).matches("senha-segura", "$2a$10$hash");
    }

    @Test
    void loginComSenhaIncorretaRejeitaCredenciais() {
        AdministradorRepository repository = mock(AdministradorRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        JwtEncoder jwtEncoder = mock(JwtEncoder.class);
        AuthService authService = new AuthService(repository, passwordEncoder, jwtEncoder, Duration.ofHours(1));

        Administrador administrador = new Administrador();
        administrador.setSenha("$2a$10$hash");
        when(repository.findByEmailIgnoreCase("admin@jurisfacil.com")).thenReturn(Optional.of(administrador));
        when(passwordEncoder.matches("senha-incorreta", administrador.getSenha())).thenReturn(false);

        assertThrows(
            CredenciaisInvalidasException.class,
            () -> authService.login(new LoginRequest("admin@jurisfacil.com", "senha-incorreta"))
        );
    }

    @Test
    void loginComEmailDesconhecidoRejeitaCredenciais() {
        AdministradorRepository repository = mock(AdministradorRepository.class);
        PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
        JwtEncoder jwtEncoder = mock(JwtEncoder.class);
        AuthService authService = new AuthService(repository, passwordEncoder, jwtEncoder, Duration.ofHours(1));

        when(repository.findByEmailIgnoreCase("inexistente@jurisfacil.com")).thenReturn(Optional.empty());

        assertThrows(
            CredenciaisInvalidasException.class,
            () -> authService.login(new LoginRequest("inexistente@jurisfacil.com", "senha"))
        );
    }
}
