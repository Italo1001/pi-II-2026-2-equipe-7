package backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verifyNoInteractions;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import backend.exception.GlobalExceptionHandler;
import backend.service.CategoriaService;

class CategoriaControllerTest {

    private CategoriaService categoriaService;
    private MockMvc mockMvc;

    @BeforeEach
    @SuppressWarnings("unused")
    void configurar() {
        categoriaService = mock(CategoriaService.class);
        mockMvc = MockMvcBuilders.standaloneSetup(new CategoriaController(categoriaService))
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void listarTermosPorCategoriaRetornaNotImplementedEnquantoAcessoNaoDisponivel() throws Exception {
        mockMvc.perform(get("/categorias/1/termos"))
                .andExpect(status().isNotImplemented());
        verifyNoInteractions(categoriaService);
    }
}
