package com.example.lesson7task1.controller;

import com.example.lesson7task1.entity.InputProduct;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.InputProductDto;
import com.example.lesson7task1.service.InputProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inputProduct")
public class InputProductController {
    @Autowired
    InputProductService inputProductService;

    @PostMapping("/add")
    public HttpEntity<?> add(@RequestBody InputProductDto inputProductDto) {
        ApiResponse apiResponse = inputProductService.add(inputProductDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> edit(@PathVariable long id, @RequestBody InputProductDto inputProductDto) {
        ApiResponse apiResponse = inputProductService.edit(id, inputProductDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping("/list")
    public HttpEntity<?> getAll() {
        List<InputProduct> all = inputProductService.getAll();
        return ResponseEntity.ok(all);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable long id) {
        ApiResponse apiResponse = inputProductService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
    @DeleteMapping("/{id}")
    public HttpEntity<?>delete(@PathVariable long id){
        ApiResponse apiResponse = inputProductService.delete(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);

    }

}
