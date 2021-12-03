package com.example.lesson7task1.exeptions;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@EqualsAndHashCode(callSuper = true)
@Data
@ResponseStatus(HttpStatus.FORBIDDEN)
public class ForbiddenExeption extends RuntimeException {
    private String type;
    private String message;

    public ForbiddenExeption(String type, String message) {
        this.type = type;
        this.message = message;
    }
}
