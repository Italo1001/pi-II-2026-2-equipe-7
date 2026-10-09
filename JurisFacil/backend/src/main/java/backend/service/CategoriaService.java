package backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import backend.data.DadosFixosApi;
import backend.dto.CategoriaComTermosDTO;
import backend.exception.RecursoNaoEncontradoException;
import backend.model.Termo;

@Service
public class CategoriaService {

    public List<String> listarCategorias() {
        return DadosFixosApi.CATEGORIAS;
    }

    public CategoriaComTermosDTO listarTermosPorCategoriaComDTO(Long id) throws RecursoNaoEncontradoException {
        if (id == null || id < 1 || id > DadosFixosApi.CATEGORIAS.size()) {
            throw new RecursoNaoEncontradoException("Categoria não encontrada com id: " + id);
        }

        String categoria = DadosFixosApi.CATEGORIAS.get(Math.toIntExact(id - 1));
        List<Termo> termos = DadosFixosApi.TERMOS.stream()
            .filter(termo -> categoria.equals(termo.getArea()))
            .toList();

        return new CategoriaComTermosDTO(id, categoria, termos);
    }
}
