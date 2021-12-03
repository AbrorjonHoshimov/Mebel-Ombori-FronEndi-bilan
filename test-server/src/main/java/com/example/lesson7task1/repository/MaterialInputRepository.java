package com.example.lesson7task1.repository;

import com.example.lesson7task1.entity.Comment;
import com.example.lesson7task1.entity.MaterialInput;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MaterialInputRepository extends JpaRepository<MaterialInput, Long> {

    Optional<MaterialInput> findByMaterial_Id(Long aLong);

    List<MaterialInput> findAllBySupplier_Id(long supplier_id);

    boolean existsById(Long id);
}
