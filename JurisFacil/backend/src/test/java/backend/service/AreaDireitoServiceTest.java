package backend.service;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import backend.dto.AreaDireitoComTermosDTO;
import backend.exception.RecursoNaoEncontradoException;
import backend.model.Termo;
import backend.model.areaDireito;
import backend.repository.AreaDireitoRepository;
import backend.repository.TermoRepository;

class AreaDireitoServiceTest {

    private final AreaDireitoRepository areaDireitoRepository = mock(AreaDireitoRepository.class);
    private final TermoRepository termoRepository = mock(TermoRepository.class);
    private final AreaDireitoService areaDireitoService = new AreaDireitoService(
            areaDireitoRepository, termoRepository);

    @Test
    void listarAreasRetornaAreasDoRepositorio() {
        List<areaDireito> areas = List.of(new areaDireito());
        when(areaDireitoRepository.findAll()).thenReturn(areas);

        assertEquals(areas, areaDireitoService.listarAreas());
        verify(areaDireitoRepository).findAll();
    }

    @Test
    void listarTermosPorAreaRetornaDadosDaAreaETermosVinculados() throws Exception {
        areaDireito area = new areaDireito();
        area.setId(4L);
        area.setNome("Direito Civil");
        List<Termo> termos = List.of(new Termo());
        when(areaDireitoRepository.findById(4L)).thenReturn(Optional.of(area));
        when(termoRepository.findByArea_Id(4L)).thenReturn(termos);

        AreaDireitoComTermosDTO resposta = areaDireitoService.listarTermosPorArea(4L);

        assertEquals(4L, resposta.id());
        assertEquals("Direito Civil", resposta.nome());
        assertEquals(termos, resposta.termos());
        verify(termoRepository).findByArea_Id(4L);
    }

    @Test
    void listarTermosPorAreaInexistenteRetornaNotFoundSemConsultarTermos() {
        when(areaDireitoRepository.findById(99L)).thenReturn(Optional.empty());

        RecursoNaoEncontradoException excecao = assertThrows(
                RecursoNaoEncontradoException.class,
                () -> areaDireitoService.listarTermosPorArea(99L));

        assertEquals("Área do Direito não encontrada com id 99", excecao.getMessage());
        verifyNoInteractions(termoRepository);
    }
}
