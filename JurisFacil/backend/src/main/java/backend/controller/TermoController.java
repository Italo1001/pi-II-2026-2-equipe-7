package backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.model.Termo;
import backend.service.TermoService;

@RestController
@RequestMapping("/termos")

public class TermoController {

    private final TermoService termoService;

    public TermoController(TermoService termoService) {
        this.termoService = termoService;
    }

    //Rota 01 — Listar termos
    @GetMapping 
    public List<Termo> listarTermos() {
        return termoService.listarTermos();
    }
 
    //Rota 02 — Buscar termo por identificador
    @GetMapping("/{id}")
    public Termo buscarTermo(@PathVariable Long id) {
        return termoService.buscarPorId(id);
    }

    // Rota 03 — Pesquisar termo
    @GetMapping("/busca")
    public List<Termo> pesquisarTermo(@RequestParam String q) {
        return termoService.pesquisarTermo(q);
    }
}
