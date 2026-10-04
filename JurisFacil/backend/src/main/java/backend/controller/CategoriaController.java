package backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.exception.RecursoNaoEncontradoException;
import backend.model.Termo;
import backend.service.CategoriaService;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {
    
    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    @GetMapping 
    public List<String> listarCategorias() {
        return categoriaService.listarCategorias();
    }

    @GetMapping("/{id}/termos")
    public List<Termo> ListarTermosPorCategoria(@PathVariable Long id) throws RecursoNaoEncontradoException {
        return categoriaService.listarTermosPorCategoria(id);
    }
}
