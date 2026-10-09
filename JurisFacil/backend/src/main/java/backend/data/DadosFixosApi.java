package backend.data;

import java.util.List;

import backend.model.Termo;

public final class DadosFixosApi {

    public static final List<String> CATEGORIAS = List.of(
        "Direito Constitucional",
        "Direito Civil",
        "Direito Penal",
        "Direito Trabalhista",
        "Direito Administrativo"
    );

    public static final List<Termo> TERMOS = List.of(
        new Termo(
            1L,
            "Habeas Corpus",
            "Instrumento jurídico utilizado para proteger a liberdade de locomoção.",
            "Direito Constitucional"
        ),
        new Termo(
            2L,
            "Usucapião",
            "Forma de aquisição da propriedade pela posse prolongada.",
            "Direito Civil"
        ),
        new Termo(
            3L,
            "Mandado de Segurança",
            "Instrumento utilizado para proteger direito líquido e certo.",
            "Direito Constitucional"
        )
    );

    private DadosFixosApi() {
    }
}
