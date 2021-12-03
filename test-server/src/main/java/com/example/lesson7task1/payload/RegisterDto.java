package com.example.lesson7task1.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RegisterDto {
    @NotNull(message = "FullName ni kiriting")
    private String fullname;
    @NotNull(message = "username ni kiriting")
    private String username;
    @NotNull(message = "password ni kiriting")
    private String password;
    @NotNull(message = "prePassword ni kiriting")
    private String prePassword;

}
