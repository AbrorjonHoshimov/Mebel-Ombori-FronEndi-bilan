package com.example.lesson7task1.controller;

import com.example.lesson7task1.entity.MaterialInput;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.InputMatDto;
import com.example.lesson7task1.service.InputMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inputMaterial")
public class InputMaterialController {
    @Autowired
    InputMaterialService inputMaterialService;

    @PostMapping("/add")
    public HttpEntity<?> add(@RequestBody InputMatDto inputMatDto) {
        ApiResponse apiResponse = inputMaterialService.add(inputMatDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> edit(@PathVariable long id, @RequestBody InputMatDto inputMatDto) {
        ApiResponse apiResponse = inputMaterialService.edit(id, inputMatDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping("/list")
    public HttpEntity<?> getAll() {
        List<MaterialInput> all = inputMaterialService.getAll();
        return ResponseEntity.ok(all);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable long id) {
        ApiResponse apiResponse = inputMaterialService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }
    @DeleteMapping("/{id}")
    public HttpEntity<?>delete(@PathVariable long id){
        ApiResponse apiResponse = inputMaterialService.delete(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }


}
