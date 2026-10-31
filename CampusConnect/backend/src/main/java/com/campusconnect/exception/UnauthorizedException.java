package com.campusconnect.exception;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends CampusConnectException {
    public UnauthorizedException(String message) {
        super(message, HttpStatus.FORBIDDEN.value());
    }
}
