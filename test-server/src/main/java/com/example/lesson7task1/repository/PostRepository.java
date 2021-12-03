package com.example.lesson7task1.repository;

import com.example.lesson7task1.entity.Post;
import com.example.lesson7task1.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post,Long> {

  }
