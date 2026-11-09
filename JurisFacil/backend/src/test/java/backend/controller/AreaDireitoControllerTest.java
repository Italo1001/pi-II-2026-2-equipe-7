package backend.controller;

import java.util.List;

import backend.dto.AreaDireitoComTermosDTO;
import backend.model.areaDireito;
import backend.service.AreaDireitoService;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import backend.exception.GlobalExceptionHandler;
import backend.exception.RecursoNaoEncontradoException;
import backend.model.Termo;

class AreaDireitoControllerTest {

    private MockMvc mockMvc;
    private AreaDireitoService areaDireitoService;

    @BeforeEach
    @SuppressWarnings("unused")
    void configurar() {
        areaDireitoService = mock(AreaDireitoService.class);
        mockMvc = MockMvcBuilders.standaloneSetup(new AreaDireitoController(areaDireitoService))
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void listarAreasRetornaIdsENomesPersistidos() throws Exception {
        areaDireito area = new areaDireito();
        area.setId(4L);
        area.setNome("Direito Civil");
        when(areaDireitoService.listarAreas()).thenReturn(List.of(area));
        mockMvc.perform(get("/areas"))
                .andExpect(status().isOk())
                .andExpect(content().json("[{\"id\":4,\"nome\":\"Direito Civil\"}]"));
        verify(areaDireitoService).listarAreas();
    }

    @Test
    void listarAreasSemRegistrosRetornaListaVazia() throws Exception {
        when(areaDireitoService.listarAreas()).thenReturn(List.of());
        mockMvc.perform(get("/areas")).andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void listarTermosPorAreaRetornaAreaETermos() throws Exception {
        Termo termo = new Termo();
        termo.setId(8L);
        termo.setNome("Dano Moral");
        termo.setSignificado("Lesão a direitos da personalidade.");
        areaDireito area = new areaDireito();
        area.setId(1L);
        area.setNome("Direito Civil");
        termo.setAreaDireito(area);
        when(areaDireitoService.listarTermosPorArea(1L))
                .thenReturn(new AreaDireitoComTermosDTO(1L, "Direito Civil", List.of(termo)));

        mockMvc.perform(get("/areas/1/termos"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                          "id": 1,
                          "nome": "Direito Civil",
                          "termos": [{
                            "id": 8,
                            "nome": "Dano Moral",
                            "significado": "Lesão a direitos da personalidade.",
                            "area": "Direito Civil"
                          }]
                        }
                        """));
    }

    @Test
    void listarTermosPorAreaInexistenteRetornaNotFound() throws Exception {
        when(areaDireitoService.listarTermosPorArea(99L))
                .thenThrow(new RecursoNaoEncontradoException(
                        "Área do Direito não encontrada com id 99"));

        mockMvc.perform(get("/areas/99/termos"))
                .andExpect(status().isNotFound());
    }
}
