package com.example.lesson7task1.controller;

import com.example.lesson7task1.entity.Material;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.MaterialDto;
import com.example.lesson7task1.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/material")
public class MaterialController {
    @Autowired
    MaterialService materialService;

    @PostMapping("/add")
    public HttpEntity<?> add(@RequestBody MaterialDto materialDto) {
        ApiResponse apiResponse = materialService.add(materialDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PutMapping("/edit/{id}")
    public HttpEntity<?> edit(@PathVariable long id, @RequestBody MaterialDto materialDto) {
        ApiResponse apiResponse = materialService.edit(id, materialDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping("/list")
    public HttpEntity<?> getAll() {
        List<Material> all = materialService.getAll();
        return ResponseEntity.ok(all);
    }

    @GetMapping("/getOne/{id}")
    public HttpEntity<?> getOne(@PathVariable long id) {
        ApiResponse apiResponse = materialService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> delete(@PathVariable long id) {
        ApiResponse apiResponse = materialService.delete(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);

    }
}
