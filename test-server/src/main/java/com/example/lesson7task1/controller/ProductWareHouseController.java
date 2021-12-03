package com.example.lesson7task1.controller;

import com.example.lesson7task1.entity.ProductWareHouse;
import com.example.lesson7task1.repository.ProductWareHouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/productWareHouse")
public class ProductWareHouseController {
    @Autowired
    ProductWareHouseRepository productWareHouseRepository;
    @GetMapping("/list")
    public HttpEntity<?> getAll(){
        List<ProductWareHouse> all = productWareHouseRepository.findAll();
        return ResponseEntity.ok(all);
    }
}
