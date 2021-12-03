package com.example.lesson7task1.exeptions;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.annotation.Resource;

@AllArgsConstructor
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundExсeption extends RuntimeException {
    private final String resourceName;
    private final String resourceField;
    private final Object object;


}
