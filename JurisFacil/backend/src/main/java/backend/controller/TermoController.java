package backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.dto.ExemploRequest;
import backend.dto.ExemploResponse;
import backend.dto.TermoRequest;
import backend.dto.TermoResponse;
import backend.exception.RecursoNaoEncontradoException;
import backend.model.Termo;
import backend.service.TermoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/termos")

public class TermoController {

    private final TermoService termoService;

    public TermoController(TermoService termoService) {
        this.termoService = termoService;
    }

    // Rota 01 — Listar termos
    @GetMapping 
    public List<Termo> listarTermos() {
        return termoService.listarTermos();
    }
    
    // Rota 03 — Pesquisar termo
    @GetMapping("/busca")
    public List<Termo> pesquisarTermo(@RequestParam String q) {
        return termoService.pesquisarTermo(q);
    }
    
    // Rota 02 — Buscar termo por identificador
    @GetMapping("/{id}")
    public Termo buscarTermo(@PathVariable Long id) throws RecursoNaoEncontradoException {
        return termoService.buscarPorId(id);
    }

    // Rota 07 - Cadastrar termo
    @PostMapping
    public ResponseEntity<TermoResponse> criarTermo(@Valid @RequestBody TermoRequest request) throws RecursoNaoEncontradoException {
        return ResponseEntity.status(HttpStatus.CREATED).body(termoService.criar(request));
    }

    // Rota 08 - Editar termo
    @PutMapping("/{id}")
    public ResponseEntity<TermoResponse> atualizarTermo(@PathVariable Long id,@Valid @RequestBody TermoRequest request) throws RecursoNaoEncontradoException {
        return ResponseEntity.ok(termoService.atualizar(id, request));
    }

    // Rota 09 - Excluir termo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirTermo(@PathVariable Long id) throws RecursoNaoEncontradoException {
        termoService.excluir(id);
        return ResponseEntity.noContent().build();
    }

    // Rota 10 - Cadastrar exemplo
    @PostMapping("/{id}/exemplos")
    public ResponseEntity<ExemploResponse> adicionarExemplo(
            @PathVariable Long id,
            @Valid @RequestBody ExemploRequest request) throws RecursoNaoEncontradoException {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(termoService.adicionarExemplo(id, request));
    }

    // Rota 13 - Editar exemplo
    @PutMapping("/{id}/exemplos/{exemploId}")
    public ResponseEntity<ExemploResponse> atualizarExemplo(
            @PathVariable Long id,
            @PathVariable Long exemploId,
            @Valid @RequestBody ExemploRequest request) throws RecursoNaoEncontradoException {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

}
