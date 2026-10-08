package backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "termos")
public class Termo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "termo")
    private String nome;

    @Column(name = "definicao", columnDefinition = "TEXT")
    private String significado;

    @Transient
    private String area;

    public Termo() {
    }

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
