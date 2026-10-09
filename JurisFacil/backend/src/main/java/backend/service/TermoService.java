package backend.service;

import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Service;

import backend.data.DadosFixosApi;
import backend.exception.RecursoNaoEncontradoException;
import backend.model.Termo;

@Service
public class TermoService {

    // Rota 01
    public List<Termo> listarTermos() {
        return DadosFixosApi.TERMOS;
    }

    // Rota 02
    public Termo buscarPorId(Long id) throws RecursoNaoEncontradoException {
        return DadosFixosApi.TERMOS.stream()
            .filter(termo -> termo.getId().equals(id))
            .findFirst()
            .orElseThrow(() -> new RecursoNaoEncontradoException("Termo não encontrado com id " + id));
    }

    // Rota 03
    public List<Termo> pesquisarTermo(String busca) {
        if (busca == null || busca.trim().isEmpty()) {
            throw new IllegalArgumentException("O parâmetro 'q' não pode estar vazio.");
        }

        String consulta = busca.trim().toLowerCase(Locale.ROOT);
        return DadosFixosApi.TERMOS.stream()
            .filter(termo -> termo.getNome().toLowerCase(Locale.ROOT).contains(consulta))
            .toList();
    }
}