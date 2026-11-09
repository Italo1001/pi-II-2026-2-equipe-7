package backend.controller;

import java.util.List;
import org.springframework.data.domain.Sort;
import backend.model.areaDireito;
import backend.repository.AreaDireitoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/areas")
public class AreaDireitoController {

    private final AreaDireitoRepository areaRepository;

    public AreaDireitoController(AreaDireitoRepository areaRepository) {
        this.areaRepository = areaRepository;
    }

    // Rota 11 - Listar áreas
    @GetMapping
    public List<areaDireito> listarAreas() {
        return areaRepository.findAll(Sort.by("nome").ascending());
    }

    // Rota 12 - Filtrar por área
    @GetMapping("/{id}/termos")
    public ResponseEntity<Void> listarTermosPorArea(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
}
