package com.example.lesson7task1.controller;

import com.example.lesson7task1.entity.Product;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.ProductDto;
import com.example.lesson7task1.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping("/add")
    public HttpEntity<?> add(@RequestBody ProductDto productDto) {
        ApiResponse apiResponse = productService.add(productDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PutMapping("/edit/{id}")
    public HttpEntity<?> edit(@PathVariable long id, @RequestBody ProductDto productDto) {
        ApiResponse apiResponse = productService.edit(id, productDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping("/list")
    public HttpEntity<?> getAll() {
        List<Product> all = productService.getAll();
        return ResponseEntity.ok(all);
    }

    @GetMapping("/getOne/{id}")
    public HttpEntity<?> getOne(@PathVariable long id) {
        ApiResponse apiResponse = productService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> delete(@PathVariable long id) {
        ApiResponse apiResponse = productService.delete(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);

    }

}
