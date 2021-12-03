package com.example.lesson7task1.repository;

import com.example.lesson7task1.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {


    boolean existsById(Long id);
}
