package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
