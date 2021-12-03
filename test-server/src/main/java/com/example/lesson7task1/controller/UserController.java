package com.example.lesson7task1.controller;

import com.example.lesson7task1.aop.CheckPermission;
import com.example.lesson7task1.entity.User;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.RegisterDto;
import com.example.lesson7task1.payload.UserDto;
import com.example.lesson7task1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @CheckPermission(huquq = "ADD_USER")
    @PostMapping
    public HttpEntity<?> addUser(@Valid @RequestBody UserDto userDto) {
        ApiResponse apiResponse = userService.addUser(userDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @CheckPermission(huquq = "EDIT_USER")
    @PutMapping("/{id}")
    public HttpEntity<?> editUser(@Valid @PathVariable long id, @RequestBody UserDto userDto) {
        ApiResponse apiResponse = userService.editUser(userDto, id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PreAuthorize(value = "hasAnyAuthority('DELETE_USER')")
    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteUser(@PathVariable long id) {
        ApiResponse apiResponse = userService.deleteUser(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PreAuthorize(value = "hasAnyAuthority('VIEW_USER')")
    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable long id) {
        ApiResponse apiResponse = userService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PreAuthorize(value = "hasAnyAuthority('VIEW_USER')")
    @GetMapping
    public HttpEntity<?> getall() {
        List<User> getall = userService.getall();
        return ResponseEntity.ok(getall);

    }
}
