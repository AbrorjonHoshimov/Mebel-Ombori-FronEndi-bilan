package com.example.lesson7task1.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.xml.ws.soap.Addressing;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
    @NotNull(message = "Firstname ni kiriting")
    private String firstname;
    @NotNull(message = "Lastname ni kiriting")
    private String lastname;
    @NotNull(message = "phone ni kiriting")
    private String phone;
    @NotNull(message = "username ni kiriting")
    private String username;
    @NotNull(message = "password ni kiriting")
    private String password;

    private Long roleId;

}
