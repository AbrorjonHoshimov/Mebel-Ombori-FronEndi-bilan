package com.example.lesson7task1.repository;

import com.example.lesson7task1.entity.Comment;
import com.example.lesson7task1.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuplierRepository extends JpaRepository<Supplier, Long> {


    boolean existsById(Long id);
}
