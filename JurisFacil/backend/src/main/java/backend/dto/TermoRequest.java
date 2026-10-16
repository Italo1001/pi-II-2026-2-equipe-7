package backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record TermoRequest(
    @NotBlank @Size(max = 150) String termo,
    @NotBlank String significado,
    @NotNull @Positive Long categoriaId,
    @NotNull @Positive Long areaId
) {
}
