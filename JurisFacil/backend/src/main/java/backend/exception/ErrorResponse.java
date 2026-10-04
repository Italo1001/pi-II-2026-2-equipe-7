package backend.exception;

import java.time.LocalDateTime;

public class ErrorResponse {
    private final int status;
    private final String mensagem;
    private final String caminho;
    private final LocalDateTime timestamp;

    public ErrorResponse(int status, String mensagem, String caminho, LocalDateTime timestamp) {
        this.status = status;
        this.mensagem = mensagem;
        this.caminho = caminho;
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getMensagem() {
        return mensagem;
    }

    public String getCaminho() {
        return caminho;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}