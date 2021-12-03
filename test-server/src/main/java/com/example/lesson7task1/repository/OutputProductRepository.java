package com.example.lesson7task1.repository;

import com.example.lesson7task1.entity.OutputProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OutputProductRepository extends JpaRepository<OutputProduct,Long> {

    List<OutputProduct> findAllByClient_Id(long client_id);
}
