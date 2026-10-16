package backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import backend.exception.RecursoNaoEncontradoException;
import backend.model.Termo;
import backend.repository.TermoRepository;

@Service
public class TermoService {


private final TermoRepository termoRepository;

public TermoService(TermoRepository termoRepository) {
    this.termoRepository = termoRepository;
}

public List<Termo> listarTermos() {
    return termoRepository.findAll();
}

public Termo buscarPorId(Long id) throws RecursoNaoEncontradoException {
    return termoRepository.findById(id)
            .orElseThrow(() -> new RecursoNaoEncontradoException(
                    "Termo não encontrado com id " + id));
}

public List<Termo> pesquisarTermo(String busca) {
    if (busca == null || busca.trim().isEmpty()) {
        throw new IllegalArgumentException("O parâmetro 'q' não pode estar vazio.");
    }

    return termoRepository.findByNomeContainingIgnoreCase(busca.trim());
}


}
