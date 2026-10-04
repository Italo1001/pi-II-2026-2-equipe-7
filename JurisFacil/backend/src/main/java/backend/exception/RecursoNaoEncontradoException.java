package backend.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

import jakarta.servlet.http.HttpServletRequest;

public class RecursoNaoEncontradoException extends Exception{
    
    public RecursoNaoEncontradoException(String mensagem) {
        super(mensagem);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> tratarParametroInvalido(IllegalArgumentException ex, HttpServletRequest request) {

        ErrorResponse erro = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            ex.getMessage(),
            request.getRequestURI(),
            LocalDateTime.now()
        );
       
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
    }

}
