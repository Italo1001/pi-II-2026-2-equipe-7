package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import backend.model.Termo;

public interface TermoRepository extends JpaRepository<Termo, Long> {
    List<Termo> findByNomeContainingIgnoreCase(String busca);

    @Query(value = "SELECT * FROM termo WHERE categoria_id = :categoriaId", nativeQuery = true)
    List<Termo> findByCategoriaId(@Param("categoriaId") Long categoriaId);
}