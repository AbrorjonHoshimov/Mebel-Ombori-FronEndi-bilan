package com.example.lesson7task1.repository;

import com.example.lesson7task1.entity.Comment;
import com.example.lesson7task1.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {


    boolean existsById(Long id);
}
