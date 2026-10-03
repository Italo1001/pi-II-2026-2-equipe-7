package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.model.Termo;

public interface TermoRepository extends JpaRepository<Termo, Long> {

    List<Termo> findByNomeContainingIgnoreCase(String busca);
}