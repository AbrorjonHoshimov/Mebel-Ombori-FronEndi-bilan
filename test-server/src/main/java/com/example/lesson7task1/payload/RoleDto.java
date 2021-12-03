package com.example.lesson7task1.payload;

import com.example.lesson7task1.entity.Permission;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoleDto {
    @NotBlank(message = "Name ni kiriting")
    private String name;
    private String description;

    @NotEmpty(message = "Huquq ni kiriting")
    private List<Permission> permissionList;
}
