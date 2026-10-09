package backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

import backend.data.DadosFixosApi;
import backend.exception.RecursoNaoEncontradoException;

class DadosFixosApiTests {

    private final TermoService termoService = new TermoService();
    private final CategoriaService categoriaService = new CategoriaService();

    @Test
    void rotasDeTermosUsamListaFixa() throws RecursoNaoEncontradoException {
        assertEquals(3, termoService.listarTermos().size());
        assertEquals(1L, termoService.buscarPorId(1L).getId());
        assertEquals("Habeas Corpus", termoService.pesquisarTermo("habeas").getFirst().getNome());
    }

    @Test
    void rotasDeCategoriasUsamIdsFixos() throws RecursoNaoEncontradoException {
        assertEquals(5, categoriaService.listarCategorias().size());

        var categoria = categoriaService.listarTermosPorCategoriaComDTO(1L);
        assertEquals("Direito Constitucional", categoria.getNome());
        assertEquals(1L, categoria.getId());
        assertEquals(2, categoria.getTermos().size());
        assertTrue(DadosFixosApi.CATEGORIAS.contains(categoria.getNome()));

        assertThrows(
            RecursoNaoEncontradoException.class,
            () -> categoriaService.listarTermosPorCategoriaComDTO(6L)
        );
    }
}
