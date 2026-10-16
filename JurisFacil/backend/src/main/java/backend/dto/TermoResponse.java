package backend.dto;

public record TermoResponse(
    Long id,
    String termo,
    String significado,
    Long categoriaId,
    Long areaId
) {
}
