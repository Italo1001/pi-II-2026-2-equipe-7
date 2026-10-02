package backend.model;

import lombok.Data;

@Data
public class Termo {

    private Long id;
    private String nome;
    private String significado;
    private String area;

    public Termo(Long id, String nome, String significado, String area) {
        this.id = id;
        this.nome = nome;
        this.significado = significado;
        this.area = area;
    }
    
    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getSignificado() {
        return significado;
    }

    public String getArea() {
        return area;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setSignificado(String significado) {
        this.significado = significado;
    }

    public void setArea(String area) {
        this.area = area;
    }

}
