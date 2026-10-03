package backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

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
    public Termo buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    // Rota 03
    public List<Termo> pesquisarTermo(String busca) {
        return repository.findByNomeContainingIgnoreCase(busca);
    }
}