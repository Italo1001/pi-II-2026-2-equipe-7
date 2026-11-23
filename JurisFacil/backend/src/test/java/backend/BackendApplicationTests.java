package backend;

import java.time.Instant;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import backend.model.Administrador;
import backend.repository.AdministradorRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import com.jayway.jsonpath.JsonPath;

@SpringBootTest(properties = {
		"app.jwt.secret=integration-test-secret-with-at-least-32-bytes",
		"spring.datasource.url=jdbc:h2:mem:jurisfacil-test;DB_CLOSE_DELAY=-1",
		"spring.datasource.driver-class-name=org.h2.Driver",
		"spring.datasource.username=sa",
		"spring.datasource.password=",
		"spring.jpa.hibernate.ddl-auto=create-drop"
})
class BackendApplicationTests {

	@Autowired
	private WebApplicationContext applicationContext;

	@Autowired
	private JwtEncoder jwtEncoder;

	@Autowired
	private FilterChainProxy springSecurityFilterChain;

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

	private MockMvc mockMvc;

	@BeforeEach
        @SuppressWarnings("unused")
	void configurarMockMvc() {
		mockMvc = MockMvcBuilders.webAppContextSetup(applicationContext)
				.addFilters(springSecurityFilterChain)
				.build();
	}

	@Test
	void contextLoads() {
	}

	@Test
	void listarAreasSemAutenticacaoRetornaOk() throws Exception {
		mockMvc.perform(get("/areas"))
				.andExpect(status().isOk());
	}

	@Test
	void listarTermosPorAreaInexistenteSemAutenticacaoRetornaNotFound() throws Exception {
		mockMvc.perform(get("/areas/999/termos"))
				.andExpect(status().isNotFound());
	}

	@Test
	void atualizarExemploExigeAutenticacao() throws Exception {
		mockMvc.perform(put("/termos/10/exemplos/25")
						.contentType(MediaType.APPLICATION_JSON)
						.content("""
								{"texto":"Texto atualizado."}
								"""))
				.andExpect(status().isUnauthorized());
	}
	private String gerarToken(String perfil) {
    Instant agora = Instant.now();

    JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuer("jurisfacil")
            .issuedAt(agora)
            .expiresAt(agora.plusSeconds(300))
            .subject("999")
            .claim("roles", List.of(perfil))
            .build();

    return jwtEncoder.encode(
            JwtEncoderParameters.from(
                    JwsHeader.with(MacAlgorithm.HS256).build(),
                    claims
            )
    ).getTokenValue();
		}

		@Test
		void listarTermosSemAutenticacaoRetornaOk() throws Exception {
			mockMvc.perform(get("/termos"))
					.andExpect(status().isOk());
		}

		@Test
		void cadastrarTermoSemAutenticacaoRetornaUnauthorized() throws Exception {
			mockMvc.perform(post("/termos")
							.contentType(MediaType.APPLICATION_JSON)
							.content("{}"))
					.andExpect(status().isUnauthorized());
		}

		@Test
		void cadastrarTermoComTokenSemPerfilAdminRetornaForbidden() throws Exception {
			String token = gerarToken("VISITANTE");

			mockMvc.perform(post("/termos")
							.header("Authorization", "Bearer " + token)
							.contentType(MediaType.APPLICATION_JSON)
							.content("{}"))
					.andExpect(status().isForbidden());
		}

		@Test
		void excluirTermoComTokenAdminAcessaOperacaoProtegida() throws Exception {
			String token = gerarToken("ADMIN");

			mockMvc.perform(delete("/termos/999999")
							.header("Authorization", "Bearer " + token))
					.andExpect(status().isNotFound());
		}

		@Test
		void acessarRotaProtegidaComTokenInvalidoRetornaUnauthorized() throws Exception {
			mockMvc.perform(delete("/termos/999999")
							.header("Authorization", "Bearer token-invalido"))
					.andExpect(status().isUnauthorized());
		}


    @Test
    @Transactional
    void loginComBCryptEmiteTokenAceitoPelaRotaProtegida() throws Exception {
        Administrador administrador = new Administrador();
        administrador.setNome("Admin de integração");
        administrador.setEmail("login.integracao@example.test");
        administrador.setSenha(passwordEncoder.encode("senha-somente-para-teste"));
        administradorRepository.saveAndFlush(administrador);

        var result = mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"email":"login.integracao@example.test","senha":"senha-somente-para-teste"}
                    """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isString())
                .andExpect(jsonPath("$.administrador.email").value("login.integracao@example.test"))
                .andExpect(jsonPath("$.administrador.senha").doesNotExist())
                .andReturn();

        String token = JsonPath.read(result.getResponse().getContentAsString(), "$.token");
        // 404 prova que o token passou pela autenticação e chegou à consulta do termo.
        mockMvc.perform(delete("/termos/999999")
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isNotFound());
    }

    @Test
    void tokenExpiradoRetornaUnauthorized() throws Exception {
        Instant agora = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("jurisfacil")
                .issuedAt(agora.minusSeconds(600))
                .expiresAt(agora.minusSeconds(300))
                .subject("999")
                .claim("roles", List.of("ADMIN"))
                .build();
        String token = jwtEncoder.encode(JwtEncoderParameters.from(
                JwsHeader.with(MacAlgorithm.HS256).build(), claims)).getTokenValue();
        mockMvc.perform(delete("/termos/999999")
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isUnauthorized());
    }

}
