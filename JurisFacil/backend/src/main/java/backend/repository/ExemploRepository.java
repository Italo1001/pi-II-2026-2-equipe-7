package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import backend.model.Exemplo;

public interface ExemploRepository extends JpaRepository<Exemplo, Long> {

    List<Exemplo> findByTermo_Id(Long termoId);

    @Modifying
    @Query("DELETE FROM Exemplo exemplo WHERE exemplo.termo.id = :termoId")
    void deleteByTermoId(@Param("termoId") Long termoId);
}