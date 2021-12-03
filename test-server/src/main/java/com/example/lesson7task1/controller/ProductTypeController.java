package com.example.lesson7task1.controller;

import com.example.lesson7task1.entity.ProductType;
import com.example.lesson7task1.entity.teplate.AbstractEntity;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.service.ProductTypeService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/productType")
public class ProductTypeController  {


    @Autowired
    ProductTypeService productTypeService;


    @PostMapping("/add")
    public HttpEntity<?>add(@RequestBody ProductType productType){
        ApiResponse apiResponse = productTypeService.add(productType);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }

    @PutMapping("/edit/{id}")
    public HttpEntity<?> edit(@PathVariable long id,@RequestBody ProductType productType){
        ApiResponse apiResponse = productTypeService.edit(id,productType);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
    @GetMapping("/list")
    public HttpEntity<?>getAll(){
        List<ProductType> all = productTypeService.all();
        return ResponseEntity.ok(all);
    }
    @GetMapping("/getOne/{id}")
    public HttpEntity<?> getOne(@PathVariable long id){
        ApiResponse apiResponse = productTypeService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
    @DeleteMapping("/{id}")
    public HttpEntity<?>delete(@PathVariable long id){
        ApiResponse apiResponse = productTypeService.delete(id);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);

    }

}
