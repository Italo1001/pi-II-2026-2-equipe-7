package backend.controller;

import java.util.List;

import backend.dto.AreaDireitoComTermosDTO;
import backend.exception.RecursoNaoEncontradoException;
import backend.model.areaDireito;
import backend.service.AreaDireitoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/areas")
public class AreaDireitoController {
    private final AreaDireitoService areaDireitoService;

    public AreaDireitoController(AreaDireitoService areaDireitoService) {
        this.areaDireitoService = areaDireitoService;
    }

    // Rota 11 - Listar áreas
    @GetMapping
    public List<areaDireito> listarAreas() {
        return areaDireitoService.listarAreas();
    }

    // Rota 12 - Filtrar por área
    @GetMapping("/{id}/termos")
    public ResponseEntity<AreaDireitoComTermosDTO> listarTermosPorArea(@PathVariable Long id)
            throws RecursoNaoEncontradoException {
        return ResponseEntity.ok(areaDireitoService.listarTermosPorArea(id));
    }
}
