package backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.dto.CategoriaComTermosDTO;
import backend.exception.RecursoNaoEncontradoException;
import backend.model.Categoria;
import backend.service.CategoriaService;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {


private final CategoriaService categoriaService;

public CategoriaController(CategoriaService categoriaService) {
    this.categoriaService = categoriaService;
}

// Rota 04 - Listar categorias
@GetMapping
public List<Categoria> listarCategorias() {
    return categoriaService.listarCategorias();
}

// Rota 05 - Filtrar por categoria
@GetMapping("/{id}/termos")
public ResponseEntity<CategoriaComTermosDTO> listarTermosPorCategoria(@PathVariable Long id) throws RecursoNaoEncontradoException {
    return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
}


}
