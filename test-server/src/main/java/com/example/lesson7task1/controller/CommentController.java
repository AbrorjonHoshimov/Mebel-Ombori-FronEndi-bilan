package com.example.lesson7task1.controller;

import com.example.lesson7task1.aop.CheckPermission;
import com.example.lesson7task1.entity.Comment;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.CommentDto;
import com.example.lesson7task1.payload.PostDto;
import com.example.lesson7task1.service.CommentService;
import com.example.lesson7task1.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping
    public HttpEntity<?> addComment(@Valid @RequestBody CommentDto commentDto) {
        ApiResponse apiResponse = commentService.addPost(commentDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PreAuthorize(value = "hasAuthority('DELETE_MYCOMMENT')")
    @DeleteMapping("/{id}")
    public HttpEntity<?> delete(@PathVariable long id) {
        ApiResponse apiResponse = commentService.deleteMyComment(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PreAuthorize(value = "hasAuthority('DELETE_COMMENT')")
    @DeleteMapping("/forAdmins/{id}")
    public HttpEntity<?> deleteCommentForAdmins(@PathVariable long id) {
        ApiResponse apiResponse = commentService.deleteCommentForAdmins(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editComment(@PathVariable long id, @RequestBody CommentDto commentDto) {
        ApiResponse apiResponse = commentService.editComment(id, commentDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping
    public HttpEntity<?> getAll() {
        List<Comment> all = commentService.getAll();
        return ResponseEntity.ok(all);
    }


}
