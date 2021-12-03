package com.example.lesson7task1.controller;

import com.example.lesson7task1.aop.CheckPermission;
import com.example.lesson7task1.entity.Role;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.RegisterDto;
import com.example.lesson7task1.payload.RoleDto;
import com.example.lesson7task1.service.AuthService;
import com.example.lesson7task1.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/role")
public class RoleController {

    @Autowired
    RoleService roleService;

    //    @PreAuthorize(value = "hasAnyAuthority('ADD_ROLE')")
    @CheckPermission(huquq = "ADD_ROLE")
    @PostMapping
    public HttpEntity<?> addRole(@Valid @RequestBody RoleDto roleDto) {
        ApiResponse apiResponse = roleService.addRole(roleDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PreAuthorize(value = "hasAnyAuthority('EDIT_ROLE')")
    @PutMapping
    public HttpEntity<?> editRole(@Valid @RequestBody RoleDto roleDto, @PathVariable long id) {
        ApiResponse apiResponse = roleService.editRole(roleDto, id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PreAuthorize(value = "hasAnyAuthority('DELETE_ROLE')")
    @DeleteMapping
    public HttpEntity<?> deleteRole(@PathVariable long id) {
        ApiResponse apiResponse = roleService.deleteRole(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PreAuthorize(value = "hasAnyAuthority('VIEW_ROLE')")
    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable Long id) {
        ApiResponse apiResponse = roleService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PreAuthorize(value = "hasAnyAuthority('VIEW_ROLE')")
    @GetMapping
    public HttpEntity<?> getall() {
        List<Role> getall = roleService.getall();
        return ResponseEntity.ok(getall);
    }
}
