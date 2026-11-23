package backend.dto;

import java.util.List;

import backend.model.Termo;

public record AreaDireitoComTermosDTO(
        Long id,
        String nome,
        List<Termo> termos) {
}
