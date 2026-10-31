package backend.service;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InOrder;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import backend.dto.ExemploRequest;
import backend.dto.ExemploResponse;
import backend.dto.TermoRequest;
import backend.dto.TermoResponse;
import backend.exception.RecursoNaoEncontradoException;
import backend.model.Categoria;
import backend.model.Exemplo;
import backend.model.Termo;
import backend.model.areaDireito;
import backend.repository.AreaDireitoRepository;
import backend.repository.CategoriaRepository;
import backend.repository.ExemploRepository;
import backend.repository.TermoRepository;

class TermoServiceTest {

    private final TermoRepository termoRepository = mock(TermoRepository.class);
    private final CategoriaRepository categoriaRepository = mock(CategoriaRepository.class);
    private final AreaDireitoRepository areaDireitoRepository = mock(AreaDireitoRepository.class);
    private final ExemploRepository exemploRepository = mock(ExemploRepository.class);
    private final TermoService termoService = new TermoService(
            termoRepository,
            categoriaRepository,
            areaDireitoRepository,
            exemploRepository);

    private final Categoria categoria = new Categoria();
    private final areaDireito area = new areaDireito();

    @BeforeEach
    @SuppressWarnings("unused")
    void configurarClassificacoes() {
        categoria.setId(3L);
        categoria.setNome("Direitos Fundamentais");
        area.setId(4L);
        area.setNome("Direito Constitucional");

        when(categoriaRepository.findById(3L)).thenReturn(Optional.of(categoria));
        when(areaDireitoRepository.findById(4L)).thenReturn(Optional.of(area));
        when(termoRepository.save(any(Termo.class))).thenAnswer(invocation -> {
            Termo termo = invocation.getArgument(0);
            if (termo.getId() == null) {
                termo.setId(10L);
            }
            return termo;
        });
    }

    @Test
    void criarTermoDeveSalvarAsDuasClassificacoesERetornarOsDados() throws Exception {
        TermoResponse resposta = termoService.criar(new TermoRequest(
                " Habeas Data ",
                " Acesso a informações pessoais. ",
                3L,
                4L));

        assertEquals(10L, resposta.id());
        assertEquals("Habeas Data", resposta.termo());
        assertEquals("Acesso a informações pessoais.", resposta.significado());
        assertEquals(3L, resposta.categoriaId());
        assertEquals(4L, resposta.areaId());
    }

    @Test
    void atualizarTermoDeveAtualizarOsDadosEManterOIdentificador() throws Exception {
        Termo termo = new Termo();
        termo.setId(12L);
        when(termoRepository.findById(12L)).thenReturn(Optional.of(termo));

        TermoResponse resposta = termoService.atualizar(
                12L,
                new TermoRequest("Habeas Corpus", "Proteção da liberdade.", 3L, 4L));

        assertEquals(12L, resposta.id());
        assertEquals("Habeas Corpus", resposta.termo());
        assertEquals("Proteção da liberdade.", resposta.significado());
        assertEquals(3L, resposta.categoriaId());
        assertEquals(4L, resposta.areaId());
    }

    @Test
    void criarTermoComCategoriaInexistenteDeveFalhar() {
        when(categoriaRepository.findById(99L)).thenReturn(Optional.empty());

        RecursoNaoEncontradoException excecao = assertThrows(
            RecursoNaoEncontradoException.class, () -> termoService.criar(
                new TermoRequest("Termo", "Significado", 99L, 4L)));

        assertEquals("Categoria não encontrada com id 99", excecao.getMessage());
    }

    @Test
    void atualizarTermoInexistenteDeveFalhar() {
        when(termoRepository.findById(99L)).thenReturn(Optional.empty());

        RecursoNaoEncontradoException excecao = assertThrows(
                RecursoNaoEncontradoException.class,
                () -> termoService.atualizar(
                        99L, new TermoRequest("Termo", "Significado", 3L, 4L)));

        assertEquals("Termo não encontrado com id 99", excecao.getMessage());
    }

    @Test
    void excluirTermoRemoveOsExemplosAssociadosAntesDoTermo() throws Exception {
        Termo termo = new Termo();
        termo.setId(10L);
        when(termoRepository.findById(10L)).thenReturn(Optional.of(termo));

        termoService.excluir(10L);

        InOrder ordem = inOrder(exemploRepository, termoRepository);
        ordem.verify(exemploRepository).deleteByTermoId(10L);
        ordem.verify(termoRepository).delete(termo);
    }

    @Test
    void excluirTermoInexistenteDeveFalharSemApagarDados() {
        when(termoRepository.findById(99L)).thenReturn(Optional.empty());

        RecursoNaoEncontradoException excecao = assertThrows(
                RecursoNaoEncontradoException.class,
                () -> termoService.excluir(99L));

        assertEquals("Termo não encontrado com id 99", excecao.getMessage());
        verifyNoInteractions(exemploRepository);
    }

    @Test
    void adicionarExemploSalvaTextoAssociadoAoTermo() throws Exception {
        Termo termo = new Termo();
        termo.setId(10L);
        Exemplo salvo = mock(Exemplo.class);
        when(salvo.getId()).thenReturn(25L);
        when(salvo.getTexto()).thenReturn("Um exemplo prático.");
        when(termoRepository.findById(10L)).thenReturn(Optional.of(termo));
        when(exemploRepository.save(any(Exemplo.class))).thenReturn(salvo);

        ExemploResponse resposta = termoService.adicionarExemplo(
                10L, new ExemploRequest(" Um exemplo prático. "));

        ArgumentCaptor<Exemplo> exemploCaptor = ArgumentCaptor.forClass(Exemplo.class);
        verify(exemploRepository).save(exemploCaptor.capture());
        assertEquals(termo, exemploCaptor.getValue().getTermo());
        assertEquals("Um exemplo prático.", exemploCaptor.getValue().getTexto());
        assertEquals(25L, resposta.id());
        assertEquals(10L, resposta.termoId());
        assertEquals("Um exemplo prático.", resposta.texto());
    }

    @Test
    void adicionarExemploParaTermoInexistenteDeveFalhar() {
        when(termoRepository.findById(99L)).thenReturn(Optional.empty());

        RecursoNaoEncontradoException excecao = assertThrows(
                RecursoNaoEncontradoException.class,
                () -> termoService.adicionarExemplo(99L, new ExemploRequest("Texto")));

        assertEquals("Termo não encontrado com id 99", excecao.getMessage());
        verify(exemploRepository, never()).save(any(Exemplo.class));
    }

}
