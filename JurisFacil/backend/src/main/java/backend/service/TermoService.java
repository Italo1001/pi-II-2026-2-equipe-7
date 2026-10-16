package backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.dto.ExemploRequest;
import backend.dto.ExemploResponse;
import backend.dto.TermoRequest;
import backend.dto.TermoResponse;
import backend.exception.RecursoNaoEncontradoException;
import backend.model.Categoria;
import backend.model.Exemplo;
import backend.model.Termo;
import backend.model.areaDireito;
import backend.repository.AreaDireitoRepository;
import backend.repository.CategoriaRepository;
import backend.repository.ExemploRepository;
import backend.repository.TermoRepository;

@Service
public class TermoService {

    private final TermoRepository termoRepository;
    private final CategoriaRepository categoriaRepository;
    private final AreaDireitoRepository areaDireitoRepository;
    private final ExemploRepository exemploRepository;

    public TermoService(
            TermoRepository termoRepository,
            CategoriaRepository categoriaRepository,
            AreaDireitoRepository areaDireitoRepository,
            ExemploRepository exemploRepository) {
        this.termoRepository = termoRepository;
        this.categoriaRepository = categoriaRepository;
        this.areaDireitoRepository = areaDireitoRepository;
        this.exemploRepository = exemploRepository;
    }

    public List<Termo> listarTermos() {
        return termoRepository.findAll();
    }

    public Termo buscarPorId(Long id) throws RecursoNaoEncontradoException {
        return termoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Termo não encontrado com id " + id));
    }

    public List<Termo> pesquisarTermo(String busca) {
        if (busca == null || busca.trim().isEmpty()) {
            throw new IllegalArgumentException("O parâmetro 'q' não pode estar vazio.");
        }

        return termoRepository.findByNomeContainingIgnoreCase(busca.trim());
    }

    public TermoResponse criar(TermoRequest request) throws RecursoNaoEncontradoException {
        Categoria categoria = buscarCategoria(request.categoriaId());
        areaDireito area = buscarAreaDireito(request.areaId());

        Termo termo = new Termo();
        termo.setNome(request.termo().trim());
        termo.setSignificado(request.significado().trim());
        termo.setCategoria(categoria);
        termo.setAreaDireito(area);

        return paraResponse(termoRepository.save(termo));
    }

    public TermoResponse atualizar(Long id, TermoRequest request) throws RecursoNaoEncontradoException {
        Termo termo = buscarPorId(id);
        Categoria categoria = buscarCategoria(request.categoriaId());
        areaDireito area = buscarAreaDireito(request.areaId());

        termo.setNome(request.termo().trim());
        termo.setSignificado(request.significado().trim());
        termo.setCategoria(categoria);
        termo.setAreaDireito(area);

        return paraResponse(termoRepository.save(termo));
    }

    @Transactional
    public void excluir(Long id) throws RecursoNaoEncontradoException {
        Termo termo = buscarPorId(id);
        exemploRepository.deleteByTermoId(id);
        termoRepository.delete(termo);
    }

    public ExemploResponse adicionarExemplo(Long termoId, ExemploRequest request)
            throws RecursoNaoEncontradoException {
        Termo termo = buscarPorId(termoId);
        Exemplo exemplo = new Exemplo();
        exemplo.setTexto(request.texto().trim());
        exemplo.setTermo(termo);

        Exemplo salvo = exemploRepository.save(exemplo);
        return new ExemploResponse(salvo.getId(), termo.getId(), salvo.getTexto());
    }

    private Categoria buscarCategoria(Long id) throws RecursoNaoEncontradoException {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Categoria não encontrada com id " + id));
    }

    private areaDireito buscarAreaDireito(Long id) throws RecursoNaoEncontradoException {
        return areaDireitoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Área do Direito não encontrada com id " + id));
    }

    private TermoResponse paraResponse(Termo termo) {
        return new TermoResponse(
                termo.getId(),
                termo.getNome(),
                termo.getSignificado(),
                termo.getCategoria().getId(),
                termo.getAreaDireito().getId());
    }

}
