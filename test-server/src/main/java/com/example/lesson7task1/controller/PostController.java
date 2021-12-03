package com.example.lesson7task1.controller;

import com.example.lesson7task1.aop.CheckPermission;
import com.example.lesson7task1.entity.Post;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.LoginDto;
import com.example.lesson7task1.payload.PostDto;
import com.example.lesson7task1.payload.RegisterDto;
import com.example.lesson7task1.service.AuthService;
import com.example.lesson7task1.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    PostService postService;

    @CheckPermission(huquq = "ADD_POST")
    @PostMapping
    public HttpEntity<?> addPost(@Valid @RequestBody PostDto postDto) {
        ApiResponse apiResponse = postService.addPost(postDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @CheckPermission(huquq = "EDIT_POST")
    @PutMapping("/{id}")
    public HttpEntity<?> editPost(@PathVariable Long id, @RequestBody PostDto postDto) {
        ApiResponse apiResponse = postService.editPost(postDto, id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PreAuthorize(value = "hasAuthority('VIEW_POST')")
    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable Long id) {
        ApiResponse apiResponse = postService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @CheckPermission(huquq = "VIEW_POST")
    @GetMapping
    public HttpEntity<?> getAll() {
        List<Post> all = postService.getAll();
        return ResponseEntity.ok(all);
    }


}
