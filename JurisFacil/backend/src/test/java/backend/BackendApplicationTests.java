package backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

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
	private FilterChainProxy springSecurityFilterChain;

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
	void listarAreasSemAutenticacaoRetornaNotImplementedEnquantoAcessoNaoDisponivel() throws Exception {
		mockMvc.perform(get("/areas"))
				.andExpect(status().isNotImplemented());
	}

	@Test
	void listarTermosPorAreaSemAutenticacaoRetornaNotImplementedEnquantoAcessoNaoDisponivel() throws Exception {
		mockMvc.perform(get("/areas/999/termos"))
				.andExpect(status().isNotImplemented());
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

}
