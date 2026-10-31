package com.campusconnect.exception;

import org.springframework.http.HttpStatus;

public class DuplicateResourceException extends CampusConnectException {
    public DuplicateResourceException(String message) {
        super(message, HttpStatus.CONFLICT.value());
    }
}
