package backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import backend.dto.AreaDireitoComTermosDTO;
import backend.exception.RecursoNaoEncontradoException;
import backend.model.Termo;
import backend.model.areaDireito;
import backend.repository.AreaDireitoRepository;
import backend.repository.TermoRepository;

@Service
public class AreaDireitoService {

    private final AreaDireitoRepository areaDireitoRepository;
    private final TermoRepository termoRepository;

    public AreaDireitoService(
            AreaDireitoRepository areaDireitoRepository,
            TermoRepository termoRepository) {
        this.areaDireitoRepository = areaDireitoRepository;
        this.termoRepository = termoRepository;
    }

    public List<areaDireito> listarAreas() {
        return areaDireitoRepository.findAll();
    }

    public AreaDireitoComTermosDTO listarTermosPorArea(Long id)
            throws RecursoNaoEncontradoException {
        areaDireito area = areaDireitoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Área do Direito não encontrada com id " + id));
        List<Termo> termos = termoRepository.findByArea_Id(id);

        return new AreaDireitoComTermosDTO(area.getId(), area.getNome(), termos);
    }
}
