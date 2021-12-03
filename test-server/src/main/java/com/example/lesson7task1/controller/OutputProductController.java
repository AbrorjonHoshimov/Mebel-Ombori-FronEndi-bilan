package com.example.lesson7task1.controller;

import com.example.lesson7task1.entity.OutputProduct;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.OutputProductDto;
import com.example.lesson7task1.service.OutputProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/outputProduct")
public class OutputProductController {
    @Autowired
    OutputProductService outputProductService;

    @PostMapping("/add")
    public HttpEntity<?> add(@RequestBody OutputProductDto outputProductDto){
        ApiResponse apiResponse =outputProductService.add(outputProductDto);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
    @PutMapping("/{id}")
    public HttpEntity<?>edit(@RequestBody OutputProductDto outputProductDto,@PathVariable long id){
        ApiResponse apiResponse =outputProductService.edit(id,outputProductDto);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
    @GetMapping("/list")
    public HttpEntity<?>getAll(){
        List<OutputProduct> all = outputProductService.getAll();
        return ResponseEntity.ok(all);
    }
    @GetMapping("/{id}")
    public HttpEntity<?>getOne(@PathVariable long id){
        ApiResponse apiResponse =outputProductService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);
    }
    @DeleteMapping("/{id}")
    public HttpEntity<?>delete(@PathVariable long id){
        ApiResponse apiResponse =outputProductService.delete(id);
        return ResponseEntity.status(apiResponse.isSuccess()?200:409).body(apiResponse);

    }
}
