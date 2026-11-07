package backend.config;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.ApplicationArguments;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import backend.model.Administrador;
import backend.repository.AdministradorRepository;

class AdministradorPasswordMigrationTest {

    @Test
    void senhaLegadaEConvertidaEmHashBcrypt() {
        Administrador administrador = new Administrador();
        administrador.setSenha("senha123");

        AdministradorRepository repository = mock(AdministradorRepository.class);
        when(repository.findAll()).thenReturn(List.of(administrador));
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        AdministradorPasswordMigration migration =
            new AdministradorPasswordMigration(repository, passwordEncoder);

        migration.run(mock(ApplicationArguments.class));

        assertTrue(passwordEncoder.matches("senha123", administrador.getSenha()));
        verify(repository).flush();
    }

      @Test
    void senhaQueJaEstaEmBcryptNaoDeveSerAlterada() {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashOriginal = passwordEncoder.encode("senha123");

        Administrador administrador = new Administrador();
        administrador.setSenha(hashOriginal);

        AdministradorRepository repository = mock(AdministradorRepository.class);
        when(repository.findAll()).thenReturn(List.of(administrador));

        AdministradorPasswordMigration migration =
            new AdministradorPasswordMigration(repository, passwordEncoder);

        migration.run(mock(ApplicationArguments.class));

        org.junit.jupiter.api.Assertions.assertEquals(
            hashOriginal,
            administrador.getSenha()
        );

        org.mockito.Mockito.verify(repository, org.mockito.Mockito.never()).flush();
    }

}
