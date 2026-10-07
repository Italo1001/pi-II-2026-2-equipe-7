package backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import backend.exception.RecursoNaoEncontradoException;
import backend.model.Termo;
import backend.repository.TermoRepository;

@Service
public class TermoService {

    private final TermoRepository repository;

    public TermoService(TermoRepository repository) {
        this.repository = repository;
    }

    // Rota 01
    public List<Termo> listarTermos() {
        return repository.findAll();
    }

    // Rota 02
    public Termo buscarPorId(Long id) throws RecursoNaoEncontradoException {
        return repository.findById(id).orElseThrow(() -> new RecursoNaoEncontradoException("Termo não encontrado com id " + id));
    }

    // Rota 03
    public List<Termo> pesquisarTermo(String busca) {
        if (busca == null || busca.trim().isEmpty()) {
            throw new IllegalArgumentException("O parâmetro 'q' não pode estar vazio.");
        }

        return repository.findAll().stream().filter(termo ->termo.getNome().toLowerCase().contains(busca.toLowerCase())).toList();
    }
}