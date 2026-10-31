package backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import backend.dto.AdministradorResponse;
import backend.dto.LoginResponse;
import backend.exception.CredenciaisInvalidasException;
import backend.exception.GlobalExceptionHandler;
import backend.service.AuthService;

class AuthControllerTest {

    private AuthService authService;
    private MockMvc mockMvc;

    @BeforeEach
    @SuppressWarnings("unused")
    void configurar() {
        authService = mock(AuthService.class);
        mockMvc = MockMvcBuilders.standaloneSetup(new AuthController(authService))
            .setControllerAdvice(new GlobalExceptionHandler())
            .build();
    }

    @Test
    void loginComCredenciaisValidasRetornaTokenEAdministrador() throws Exception {
        when(authService.login(any())).thenReturn(new LoginResponse(
            "token-assinado",
            new AdministradorResponse(1L, "Administradora", "admin@jurisfacil.com")
        ));

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"email":"admin@jurisfacil.com","senha":"senha-segura"}
                    """))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.token").value("token-assinado"))
            .andExpect(jsonPath("$.administrador.id").value(1))
            .andExpect(jsonPath("$.administrador.email").value("admin@jurisfacil.com"));
    }

    @Test
    void loginComDadosInvalidosRetornaBadRequest() throws Exception {
        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"email":"email-invalido","senha":""}
                    """))
            .andExpect(status().isBadRequest());
    }

    @Test
    void credenciaisInvalidasRetornamUnauthorized() throws Exception {
        when(authService.login(any())).thenThrow(new CredenciaisInvalidasException());

        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"email":"admin@jurisfacil.com","senha":"senha-incorreta"}
                    """))
            .andExpect(status().isUnauthorized())
            .andExpect(jsonPath("$.mensagem").value("Credenciais inválidas."));
    }
}
