package com.example.lesson7task1.controller;

import com.example.lesson7task1.entity.MaterialOutput;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.OutputMaterialDto;
import com.example.lesson7task1.service.OutputMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/otputMaterial")
public class OutputMaterialControlleer {
    @Autowired
    OutputMaterialService outputMaterialService;

    @PostMapping("/add")
    public HttpEntity<?> add(@RequestBody OutputMaterialDto outputMaterialDto ){
       ApiResponse apiResponse = outputMaterialService.add(outputMaterialDto);
       return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
    @PutMapping("/{id}")
    public HttpEntity<?>edit(@PathVariable long id,OutputMaterialDto outputMaterialDto){
        ApiResponse apiResponse = outputMaterialService.edit(id,outputMaterialDto);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
    @GetMapping("/list")
    public HttpEntity<?>getAll(){
        List<MaterialOutput> all = outputMaterialService.getAll();
        return ResponseEntity.ok(all);
    }
    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable long id){
        ApiResponse apiResponse = outputMaterialService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
    @DeleteMapping("/{id}")
    public HttpEntity<?>delete(@PathVariable long id){
        ApiResponse apiResponse = outputMaterialService.delete(id);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
}
