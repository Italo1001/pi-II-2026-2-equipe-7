package backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "termo")
public class Termo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "definicao_tecnica", columnDefinition = "TEXT")
    private String significado;

   @ManyToOne
   @JoinColumn(name = "area_direito_id")
   private areaDireito area;

    public Termo() {
    }

    public Termo(Long id, String nome, String significado, String area) {
    this.id = id;
    this.nome = nome;
    this.significado = significado;
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
    if (area!= null) {
        return area.getNome();
    }

    return null;
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
    
    @JsonIgnore
    public areaDireito getAreaDireito() {
    return area;
}

   public void setAreaDireito(areaDireito areaDireito) {
    this.area= areaDireito;
  }
}
