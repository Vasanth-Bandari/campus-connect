package com.campusconnect.exception;

public class CampusConnectException extends RuntimeException {
    private final int statusCode;

    public CampusConnectException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
