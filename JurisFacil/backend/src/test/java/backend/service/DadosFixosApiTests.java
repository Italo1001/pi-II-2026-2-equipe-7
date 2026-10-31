
package backend.service;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import backend.dto.CategoriaComTermosDTO;
import backend.exception.RecursoNaoEncontradoException;
import backend.model.Categoria;
import backend.model.Termo;
import backend.repository.AreaDireitoRepository;
import backend.repository.CategoriaRepository;
import backend.repository.ExemploRepository;
import backend.repository.TermoRepository;

class DadosFixosApiTests {

    @Test
    void listarTermosDeveRetornarTermosDoRepositorio() {
        TermoRepository repository = mock(TermoRepository.class);
        TermoService termoService = new TermoService(
            repository,
            mock(CategoriaRepository.class),
            mock(AreaDireitoRepository.class),
            mock(ExemploRepository.class));

        Termo termo = new Termo(1L, "Dano Moral", "Definição de teste", null);

        when(repository.findAll()).thenReturn(List.of(termo));

        assertEquals(1, termoService.listarTermos().size());
        assertEquals("Dano Moral", termoService.listarTermos().getFirst().getNome());
    }

    @Test
    void buscarTermoPorIdDeveRetornarTermoEncontrado() throws RecursoNaoEncontradoException {
        TermoRepository repository = mock(TermoRepository.class);
        TermoService termoService = new TermoService(
            repository,
            mock(CategoriaRepository.class),
            mock(AreaDireitoRepository.class),
            mock(ExemploRepository.class));

        Termo termo = new Termo(1L, "Dano Moral", "Definição de teste", null);

        when(repository.findById(1L)).thenReturn(Optional.of(termo));

        assertEquals(1L, termoService.buscarPorId(1L).getId());
    }

    @Test
    void buscarTermoInexistenteDeveLancarExcecao() {
        TermoRepository repository = mock(TermoRepository.class);
        TermoService termoService = new TermoService(
            repository,
            mock(CategoriaRepository.class),
            mock(AreaDireitoRepository.class),
            mock(ExemploRepository.class));

        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertEquals(
            RecursoNaoEncontradoException.class,
            assertThrows(
                RecursoNaoEncontradoException.class,
                () -> termoService.buscarPorId(99L)
            ).getClass()
        );
    }

    @Test
    void listarCategoriasDeveRetornarCategoriasDoRepositorio() {
        CategoriaRepository repository = mock(CategoriaRepository.class);
        TermoRepository termoRepository = mock(TermoRepository.class);
        CategoriaService categoriaService = new CategoriaService(repository, termoRepository);

        Categoria categoria = new Categoria();
        categoria.setId(1L);
        categoria.setNome("Responsabilidade Civil");

        when(repository.findAll()).thenReturn(List.of(categoria));

        assertEquals(1, categoriaService.listarCategorias().size());
        assertEquals("Responsabilidade Civil", categoriaService.listarCategorias().getFirst().getNome());
    }

    @Test
    void listarTermosPorCategoriaDeveRetornarCategoriaETermos()
            throws RecursoNaoEncontradoException {

        CategoriaRepository categoriaRepository = mock(CategoriaRepository.class);
        TermoRepository termoRepository = mock(TermoRepository.class);

        CategoriaService categoriaService =
            new CategoriaService(categoriaRepository, termoRepository);

        Categoria categoria = new Categoria();
        categoria.setId(10L);
        categoria.setNome("Responsabilidade Civil");

        Termo termo = new Termo(1L, "Dano Moral", "Definição de teste", null);

        when(categoriaRepository.findById(10L)).thenReturn(Optional.of(categoria));
        when(termoRepository.findByCategoriaId(10L)).thenReturn(List.of(termo));

        CategoriaComTermosDTO resultado =
            categoriaService.listarTermosPorCategoriaComDTO(10L);

        assertEquals(10L, resultado.getId());
        assertEquals("Responsabilidade Civil", resultado.getNome());
        assertEquals(1, resultado.getTermos().size());
    }

    @Test
    void listarTermosDeCategoriaInexistenteDeveLancarExcecao() {
        CategoriaRepository categoriaRepository = mock(CategoriaRepository.class);
        TermoRepository termoRepository = mock(TermoRepository.class);

        CategoriaService categoriaService =
            new CategoriaService(categoriaRepository, termoRepository);

        when(categoriaRepository.findById(99L)).thenReturn(Optional.empty());

        assertEquals(
            RecursoNaoEncontradoException.class, 
            assertThrows(
                RecursoNaoEncontradoException.class,
                () -> categoriaService.listarTermosPorCategoriaComDTO(99L))
            .getClass()
        );
    }

}
