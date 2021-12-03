package com.example.lesson7task1.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginDto {
    @NotNull(message = "username bo'sh bo'lmasin")
    private String username;
    @NotNull(message = "password bo'sh bo'lmasin")
    private String password;
}
