package com.example.lesson7task1.repository;

import com.example.lesson7task1.entity.Client;
import com.example.lesson7task1.entity.InputProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InputProductRepository extends JpaRepository<InputProduct, Long> {


    boolean existsById(Long id);
}
