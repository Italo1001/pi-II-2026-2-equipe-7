package backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import backend.model.Administrador;
import backend.repository.AdministradorRepository;

@Component
public class AdministradorPasswordMigration implements ApplicationRunner {

    private static final Logger logger = LoggerFactory.getLogger(AdministradorPasswordMigration.class);

    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;

    public AdministradorPasswordMigration(
            AdministradorRepository administradorRepository,
            PasswordEncoder passwordEncoder) {
        this.administradorRepository = administradorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        int migrated = 0;
        for (Administrador administrador : administradorRepository.findAll()) {
            String senha = administrador.getSenha();
            if (!isBcryptHash(senha)) {
                administrador.setSenha(passwordEncoder.encode(senha));
                migrated++;
            }
        }

        if (migrated > 0) {
            administradorRepository.flush();
            logger.info("Senhas legadas de {} administrador(es) foram migradas para BCrypt.", migrated);
        }
    }

    private boolean isBcryptHash(String value) {
        return value != null
            && value.length() == 60
            && (value.startsWith("$2a$") || value.startsWith("$2b$") || value.startsWith("$2y$"));
    }
}
