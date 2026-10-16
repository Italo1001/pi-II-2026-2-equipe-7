package backend.dto;

import jakarta.validation.constraints.NotBlank;

public record ExemploRequest(
    @NotBlank String texto
) {
}
