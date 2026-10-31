package backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import backend.exception.GlobalExceptionHandler;

class AreaDireitoControllerTest {

    private MockMvc mockMvc;

    @BeforeEach
    @SuppressWarnings("unused")
    void configurar() {
        mockMvc = MockMvcBuilders.standaloneSetup(new AreaDireitoController())
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void listarAreasRetornaNotImplementedEnquantoAcessoNaoDisponivel() throws Exception {
        mockMvc.perform(get("/areas"))
                .andExpect(status().isNotImplemented());
    }

    @Test
    void listarTermosPorAreaRetornaNotImplementedEnquantoAcessoNaoDisponivel() throws Exception {
        mockMvc.perform(get("/areas/1/termos"))
                .andExpect(status().isNotImplemented());
    }
}
