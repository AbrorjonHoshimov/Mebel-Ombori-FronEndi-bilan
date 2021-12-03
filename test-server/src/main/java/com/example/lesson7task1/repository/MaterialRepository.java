package com.example.lesson7task1.repository;

import com.example.lesson7task1.entity.Comment;
import com.example.lesson7task1.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository<Material, Long> {


    boolean existsById(Long id);
}
