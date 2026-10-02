package backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import backend.model.Termo;

@Service
public class TermoService {

    private static final List<Termo> TERMOS = List.of(
        new Termo(
            1L,
            "Habeas Corpus",
            "Instrumento jurídico utilizado para proteger a liberdade de locomoção.",
            "Direito Constitucional"
        ),
        new Termo(
            2L,
            "Usucapião",
            "Forma de aquisição da propriedade pela posse prolongada.",
            "Direito Civil"
        ),
        new Termo(
            3L,
            "Mandado de Segurança",
            "Instrumento utilizado para proteger direito líquido e certo.",
            "Direito Constitucional"
        )
    );

    public List<Termo> listarTermos() {
        return TERMOS;
    }

    public Termo buscarPorId(Long id) {
        return TERMOS.stream()
            .filter(termo -> termo.getId().equals(id))
            .findFirst()
            .orElse(null);
    }

    public List<Termo> pesquisarTermo(String busca) {
        return TERMOS.stream()
            .filter(termo ->
                termo.getNome()
                    .toLowerCase()
                    .contains(busca.toLowerCase())
            )
            .toList();
    }
}