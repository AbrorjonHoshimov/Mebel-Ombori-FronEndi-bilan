package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.Comment;
import com.example.lesson7task1.entity.Post;
import com.example.lesson7task1.entity.User;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.CommentDto;
import com.example.lesson7task1.repository.CommentRepository;
import com.example.lesson7task1.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    PostRepository postRepository;
    @Autowired
    CommentRepository commentRepository;

    public ApiResponse addPost(CommentDto commentDto) {
        Optional<Post> byId = postRepository.findById(commentDto.getPostId());
        if (!byId.isPresent()) return new ApiResponse("Not found", false);
        Post post = byId.get();
        Comment comment = new Comment(commentDto.getText(), post);
        commentRepository.save(comment);
        return new ApiResponse("saved", true);
    }

    public ApiResponse deleteMyComment(long id) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (!optionalComment.isPresent()) return new ApiResponse("Not found", false);
        Comment comment = optionalComment.get();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (comment.getCreatedBy() != user.getId()) {
            return new ApiResponse("Commentni ochira olmaysiz", false);
        }
        commentRepository.deleteById(id);
        return new ApiResponse("Deleted", true);
    }

    public ApiResponse deleteCommentForAdmins(long id) {
        boolean exists = commentRepository.existsById(id);
        if (!exists) return new ApiResponse("Not found", false);
        commentRepository.deleteById(id);
        return new ApiResponse("Deleted", true);
    }

    public ApiResponse editComment(long id, CommentDto commentDto) {
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (!optionalComment.isPresent()) return new ApiResponse("Not found", false);
        Comment comment = optionalComment.get();
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (comment.getCreatedBy() != user.getId()) {
            return new ApiResponse("Commentni O'zgartira olmaysiz olmaysiz", false);
        }
        comment.setText(commentDto.getText());
        comment.setPost(comment.getPost());
        commentRepository.save(comment);
        return new ApiResponse("Edited", true);
    }

    public List<Comment> getAll() {
        List<Comment> all = commentRepository.findAll();
        return all;
    }
}
