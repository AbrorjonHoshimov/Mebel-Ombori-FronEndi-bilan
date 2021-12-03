package com.example.lesson7task1.repository;

import com.example.lesson7task1.entity.Client;
import com.example.lesson7task1.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {


    boolean existsById(Long id);
}
