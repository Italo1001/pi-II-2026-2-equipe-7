package backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "exemplo")
public class Exemplo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String texto;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "termo_id", nullable = false)
    private Termo termo;

    public Exemplo() {
    }

    public Long getId() {
        return id;
    }

    public String getTexto() {
        return texto;
    }

    public Termo getTermo() {
        return termo;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public void setTermo(Termo termo) {
        this.termo = termo;
    }
}
