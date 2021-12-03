package com.example.lesson7task1.repository;

import com.example.lesson7task1.entity.Client;
import com.example.lesson7task1.entity.MaterialWareHouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MaterialWareHouseRepository extends JpaRepository<MaterialWareHouse, Long> {

    Optional<MaterialWareHouse> findByMaterial_Id(Long aLong);


    boolean existsByMaterial_Id(Long id);
}
