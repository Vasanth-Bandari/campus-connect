package com.campusconnect.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends CampusConnectException {
    public ResourceNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND.value());
    }
}
