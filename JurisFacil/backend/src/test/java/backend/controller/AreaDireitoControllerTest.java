package backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import backend.exception.GlobalExceptionHandler;
import backend.model.areaDireito;
import backend.repository.AreaDireitoRepository;
import java.util.List;
import org.springframework.data.domain.Sort;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

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
    void listarAreasRetornaIdsENomesDoBanco() throws Exception {
        areaDireito area = new areaDireito();
        area.setId(7L);
        area.setNome("Direito Civil");
        when(repository.findAll(Sort.by("nome").ascending())).thenReturn(List.of(area));
        mockMvc.perform(get("/areas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(7))
                .andExpect(jsonPath("$[0].nome").value("Direito Civil"));
    }

    @Test
    void listarAreasSemDadosRetornaListaVazia() throws Exception {
        when(repository.findAll(Sort.by("nome").ascending())).thenReturn(List.of());
        mockMvc.perform(get("/areas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }

    @Test
    void listarTermosPorAreaRetornaNotImplementedEnquantoAcessoNaoDisponivel() throws Exception {
        mockMvc.perform(get("/areas/1/termos"))
                .andExpect(status().isNotImplemented());
    }
}
