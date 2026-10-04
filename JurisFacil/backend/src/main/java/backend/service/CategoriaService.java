package backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import backend.exception.RecursoNaoEncontradoException;
import backend.model.Termo;

@Service
public class CategoriaService {

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

    public List<String> listarCategorias() {
        return List.of(
            "Direito Constitucional",
            "Direito Civil",
            "Direito Penal",
            "Direito Trabalhista",
            "Direito Administrativo"
        );
    }

    public List<Termo> listarTermosPorCategoria(Long id) throws RecursoNaoEncontradoException {
        String categoria = switch (id == null ? -1 : Math.toIntExact(id)) {
            case 1 -> "Direito Constitucional";
            case 2 -> "Direito Civil";
            default -> throw new RecursoNaoEncontradoException("Categoria não encontrada com id " + id);
        };

        return TERMOS.stream()
            .filter(termo -> termo.getArea().equals(categoria))
            .toList();
    }
}
