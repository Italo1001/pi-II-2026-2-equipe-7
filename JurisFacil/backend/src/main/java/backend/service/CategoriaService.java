package backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import backend.dto.CategoriaComTermosDTO;
import backend.exception.RecursoNaoEncontradoException;
import backend.model.Categoria;
import backend.model.Termo;
import backend.repository.CategoriaRepository;
import backend.repository.TermoRepository;

@Service
public class CategoriaService {


private final CategoriaRepository categoriaRepository;
private final TermoRepository termoRepository;

public CategoriaService(
        CategoriaRepository categoriaRepository,
        TermoRepository termoRepository) {
    this.categoriaRepository = categoriaRepository;
    this.termoRepository = termoRepository;
}

public List<Categoria> listarCategorias() {
    return categoriaRepository.findAll();
}

public CategoriaComTermosDTO listarTermosPorCategoriaComDTO(Long id)
        throws RecursoNaoEncontradoException {

    Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new RecursoNaoEncontradoException(
                    "Categoria não encontrada com id: " + id));

    List<Termo> termos = termoRepository.findByCategoriaId(id);

    return new CategoriaComTermosDTO(
            categoria.getId(),
            categoria.getNome(),
            termos);
}


}
