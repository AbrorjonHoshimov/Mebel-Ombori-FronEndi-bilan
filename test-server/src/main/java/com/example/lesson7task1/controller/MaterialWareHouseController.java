package com.example.lesson7task1.controller;

import com.example.lesson7task1.entity.MaterialWareHouse;
import com.example.lesson7task1.repository.MaterialWareHouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/matWareHouse")
public class MaterialWareHouseController {
    @Autowired
    MaterialWareHouseRepository materialWareHouseRepository;
    @GetMapping("/list")
    public HttpEntity<?> getAll(){
        List<MaterialWareHouse> all = materialWareHouseRepository.findAll();
        return ResponseEntity.ok(all);
    }

}
