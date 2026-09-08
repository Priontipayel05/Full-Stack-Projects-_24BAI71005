package com.example.exception_logging_experiment.response;

import java.time.LocalDateTime;

public class ErrorResponse {

    private boolean success;

    private String message;

    private String path;

    private String correlationId;

    private LocalDateTime timestamp;

    public ErrorResponse() {
    }

    public ErrorResponse(
            boolean success,
            String message,
            String path,
            String correlationId,
            LocalDateTime timestamp) {

        this.success = success;
        this.message = message;
        this.path = path;
        this.correlationId = correlationId;
        this.timestamp = timestamp;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getCorrelationId() {
        return correlationId;
    }

    public void setCorrelationId(String correlationId) {
        this.correlationId = correlationId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}