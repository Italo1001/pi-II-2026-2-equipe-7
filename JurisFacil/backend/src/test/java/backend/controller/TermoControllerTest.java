package backend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import org.mockito.Mockito;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import backend.dto.ExemploResponse;
import backend.dto.TermoResponse;
import backend.exception.GlobalExceptionHandler;
import backend.exception.RecursoNaoEncontradoException;
import backend.service.TermoService;

class TermoControllerTest {

    private TermoService termoService;
    private MockMvc mockMvc;

    @BeforeEach
    @SuppressWarnings("unused")
    void configurar() {
        termoService = mock(TermoService.class);
        mockMvc = MockMvcBuilders.standaloneSetup(new TermoController(termoService))
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void criarTermoRetornaCreatedERepresentacaoDoTermo() throws Exception {
        when(termoService.criar(any())).thenReturn(
                new TermoResponse(10L, "Habeas Data", "Acesso a informações pessoais.", 3L, 4L));

        mockMvc.perform(post("/termos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "termo": "Habeas Data",
                                  "significado": "Acesso a informações pessoais.",
                                  "categoriaId": 3,
                                  "areaId": 4
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.termo").value("Habeas Data"))
                .andExpect(jsonPath("$.categoriaId").value(3))
                .andExpect(jsonPath("$.areaId").value(4));
    }

    @Test
    void atualizarTermoRetornaOkERepresentacaoAtualizada() throws Exception {
        when(termoService.atualizar(eq(10L), any())).thenReturn(
                new TermoResponse(10L, "Habeas Data", "Definição atualizada.", 3L, 4L));

        mockMvc.perform(put("/termos/10")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "termo": "Habeas Data",
                                  "significado": "Definição atualizada.",
                                  "categoriaId": 3,
                                  "areaId": 4
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.significado").value("Definição atualizada."));
    }

    @Test
    void cadastrarTermoSemAreaRetornaBadRequest() throws Exception {
        mockMvc.perform(post("/termos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "termo": "Habeas Data",
                                  "significado": "Acesso a informações pessoais.",
                                  "categoriaId": 3
                                }
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    void atualizarTermoInexistenteRetornaNotFound() throws Exception {
        when(termoService.atualizar(eq(99L), any()))
                .thenThrow(new RecursoNaoEncontradoException("Termo não encontrado com id 99"));

        mockMvc.perform(put("/termos/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "termo": "Habeas Data",
                                  "significado": "Acesso a informações pessoais.",
                                  "categoriaId": 3,
                                  "areaId": 4
                                }
                                """))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.mensagem").value("Termo não encontrado com id 99"));
    }

    @Test
    void excluirTermoRetornaNoContentSemCorpo() throws Exception {
        mockMvc.perform(delete("/termos/10"))
                .andExpect(status().isNoContent())
                .andExpect(content().string(""));
    }

    @Test
    void excluirTermoInexistenteRetornaNotFound() throws Exception {
        Mockito.doThrow(
                new RecursoNaoEncontradoException("Termo não encontrado com id 99"))
                .when(termoService).excluir(99L);

        mockMvc.perform(delete("/termos/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void adicionarExemploRetornaCreatedEExemploAssociado() throws Exception {
        when(termoService.adicionarExemplo(eq(10L), any())).thenReturn(
                new ExemploResponse(25L, 10L, "O advogado solicitou habeas data."));

        mockMvc.perform(post("/termos/10/exemplos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"texto":"O advogado solicitou habeas data."}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(25))
                .andExpect(jsonPath("$.termoId").value(10))
                .andExpect(jsonPath("$.texto").value("O advogado solicitou habeas data."));
    }

    @Test
    void adicionarExemploComTextoEmBrancoRetornaBadRequest() throws Exception {
        mockMvc.perform(post("/termos/10/exemplos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"texto":" "}
                                """))
                .andExpect(status().isBadRequest());
    }

    @Test
    void adicionarExemploParaTermoInexistenteRetornaNotFound() throws Exception {
        when(termoService.adicionarExemplo(eq(99L), any()))
                .thenThrow(new RecursoNaoEncontradoException("Termo não encontrado com id 99"));

        mockMvc.perform(post("/termos/99/exemplos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"texto":"Exemplo de uso."}
                                """))
                .andExpect(status().isNotFound());
    }

    @Test
    void atualizarExemploRetornaNotImplementedEnquantoAcessoNaoDisponivel() throws Exception {
        mockMvc.perform(put("/termos/10/exemplos/25")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"texto":"Texto atualizado."}
                                        """))
                .andExpect(status().isNotImplemented());
        Mockito.verifyNoInteractions(termoService);
    }

    @Test
    void atualizarExemploComTextoEmBrancoRetornaBadRequest() throws Exception {
        mockMvc.perform(put("/termos/10/exemplos/25")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content("""
                                        {"texto":" "}
                                        """))
                .andExpect(status().isBadRequest());
    }

}
