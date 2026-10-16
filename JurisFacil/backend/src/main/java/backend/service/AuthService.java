package backend.service;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.dto.AdministradorResponse;
import backend.dto.LoginRequest;
import backend.dto.LoginResponse;
import backend.exception.CredenciaisInvalidasException;
import backend.model.Administrador;
import backend.repository.AdministradorRepository;

@Service
public class AuthService {

    private final AdministradorRepository administradorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;
    private final Duration jwtExpiration;

    public AuthService(
            AdministradorRepository administradorRepository,
            PasswordEncoder passwordEncoder,
            JwtEncoder jwtEncoder,
            @Value("${app.jwt.expiration:PT1H}") Duration jwtExpiration) {
        this.administradorRepository = administradorRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtEncoder = jwtEncoder;
        if (jwtExpiration.isZero() || jwtExpiration.isNegative()) {
            throw new IllegalArgumentException("A validade do JWT deve ser positiva.");
        }
        this.jwtExpiration = jwtExpiration;
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        String email = request.email().trim().toLowerCase(Locale.ROOT);
        Administrador administrador = administradorRepository.findByEmailIgnoreCase(email)
            .filter(candidato -> passwordEncoder.matches(request.senha(), candidato.getSenha()))
            .orElseThrow(CredenciaisInvalidasException::new);

        Instant agora = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
            .issuer("jurisfacil")
            .issuedAt(agora)
            .expiresAt(agora.plus(jwtExpiration))
            .subject(administrador.getId().toString())
            .claim("roles", List.of("ADMIN"))
            .build();

        String token = jwtEncoder.encode(JwtEncoderParameters.from(
            JwsHeader.with(MacAlgorithm.HS256).build(),
            claims
        )).getTokenValue();

        return new LoginResponse(token, new AdministradorResponse(
            administrador.getId(),
            administrador.getNome(),
            administrador.getEmail()
        ));
    }
}
