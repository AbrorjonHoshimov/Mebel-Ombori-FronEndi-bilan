package com.example.lesson7task1.repository;

import com.example.lesson7task1.entity.InputProduct;
import com.example.lesson7task1.entity.ProductWareHouse;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductWareHouseRepository extends JpaRepository<ProductWareHouse, Long> {


     boolean existsByProduct_IdAndProductType_Id(long product_id, long productType_id);

    Optional<ProductWareHouse> findByProduct_IdAndProductType_Id(long product_id, long productType_id);

    boolean existsById(Long id);
}
