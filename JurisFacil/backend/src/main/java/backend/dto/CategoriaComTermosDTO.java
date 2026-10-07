package backend.dto;

import java.util.List;

import backend.model.Termo;

public class CategoriaComTermosDTO {

    private final Long id;
    private final String nome;
    private final List<Termo> termos;

    public CategoriaComTermosDTO(Long id, String nome, List<Termo> termos) {
        this.id = id;
        this.nome = nome;
        this.termos = termos;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public List<Termo> getTermos() {
        return termos;
    }

}
