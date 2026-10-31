package backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/areas")
public class AreaDireitoController {

    // Rota 11 - Listar áreas
    @GetMapping
    public ResponseEntity<Void> listarAreas() {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // Rota 12 - Filtrar por área
    @GetMapping("/{id}/termos")
    public ResponseEntity<Void> listarTermosPorArea(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
}
