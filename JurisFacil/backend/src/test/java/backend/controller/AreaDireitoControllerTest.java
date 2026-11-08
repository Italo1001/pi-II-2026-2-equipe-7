package backend.controller;

import java.util.List;
import backend.model.areaDireito;
import backend.repository.AreaDireitoRepository;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import backend.exception.GlobalExceptionHandler;

class AreaDireitoControllerTest {

    private MockMvc mockMvc;
    private AreaDireitoRepository repository;

    @BeforeEach
    @SuppressWarnings("unused")
    void configurar() {
        repository = mock(AreaDireitoRepository.class);
        mockMvc = MockMvcBuilders.standaloneSetup(new AreaDireitoController(repository))
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void listarAreasRetornaIdsENomesPersistidos() throws Exception {
        areaDireito area = new areaDireito();
        area.setId(4L);
        area.setNome("Direito Civil");
        when(repository.findAll()).thenReturn(List.of(area));
        mockMvc.perform(get("/areas"))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":4,\"nome\":\"Direito Civil\"}]"));
        verify(repository).findAll();
    }

    @Test
    void listarAreasSemRegistrosRetornaListaVazia() throws Exception {
        when(repository.findAll()).thenReturn(List.of());
        mockMvc.perform(get("/areas")).andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void listarTermosPorAreaRetornaNotImplementedEnquantoAcessoNaoDisponivel() throws Exception {
        mockMvc.perform(get("/areas/1/termos"))
                .andExpect(status().isNotImplemented());
    }
}
