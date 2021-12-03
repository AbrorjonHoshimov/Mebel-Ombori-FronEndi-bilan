package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.Post;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.PostDto;
import com.example.lesson7task1.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    PostRepository postRepostory;

    public ApiResponse addPost(PostDto postDto) {
        Post post = new Post(postDto.getTitle(), postDto.getText(), postDto.getUrl());
        postRepostory.save(post);
        return new ApiResponse("Saved", true);
    }

    public ApiResponse editPost(PostDto postDto, Long id) {
        Optional<Post> byId = postRepostory.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not found", false);
        Post post = byId.get();
        post.setText(postDto.getText());
        post.setTitle(postDto.getTitle());
        post.setUrl(postDto.getUrl());
        postRepostory.save(post);
        return new ApiResponse("Edited", true);
    }

    public ApiResponse getOne(Long id) {
        Optional<Post> byId = postRepostory.findById(id);
        if (byId.isPresent()) return new ApiResponse("not found", false);
        return new ApiResponse("Ok", true, byId.get());

    }

    public List<Post> getAll() {
        List<Post> all = postRepostory.findAll();
        return all;
    }
}
