package com.example.lesson7task1.repository;

import com.example.lesson7task1.entity.Comment;
import com.example.lesson7task1.entity.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeasurementRepository extends JpaRepository<Measurement, Long> {


    boolean existsById(Long id);
}
