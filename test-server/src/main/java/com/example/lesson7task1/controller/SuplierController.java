package com.example.lesson7task1.controller;

import com.example.lesson7task1.entity.MaterialInput;
import com.example.lesson7task1.entity.Supplier;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.service.SuplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suplier")
public class SuplierController {
    @Autowired
    SuplierService suplierService;

    @PostMapping("/add")
    public HttpEntity<?> add(@RequestBody Supplier supplier) {
        ApiResponse apiResponse = suplierService.add(supplier);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PutMapping("/edit/{id}")
    public HttpEntity<?> edit(@PathVariable long id, @RequestBody Supplier supplier) {
        ApiResponse apiResponse = suplierService.edit(id, supplier);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping("/list")
    public HttpEntity<?> getAll() {
        List<Supplier> all = suplierService.getAll();
        return ResponseEntity.ok(all);
    }

    @GetMapping("/getOne/{id}")
    public HttpEntity<?> getOne(@PathVariable long id) {
        ApiResponse apiResponse = suplierService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
    @DeleteMapping("/{id}")
    public HttpEntity<?> delete(@PathVariable long id){
        ApiResponse apiResponse = suplierService.delete(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
    @GetMapping("/suplierGetMaterial/{id}")
    public HttpEntity<?>getOneMaterialSuplier(@PathVariable long id){
        List<MaterialInput> oneMaterialSuplier = suplierService.getOneMaterialSuplier(id);
        return ResponseEntity.ok(oneMaterialSuplier);
    }

}
