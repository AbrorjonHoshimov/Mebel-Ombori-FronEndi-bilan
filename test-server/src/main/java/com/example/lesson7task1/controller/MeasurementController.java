package com.example.lesson7task1.controller;

import com.example.lesson7task1.entity.Measurement;
import com.example.lesson7task1.entity.ProductType;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.service.MeasurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/measurement")
public class MeasurementController {
    @Autowired
    MeasurementService measurementService;

    @PostMapping("/add")
    public HttpEntity<?>add(@RequestBody Measurement measurement){
        ApiResponse apiResponse = measurementService.add(measurement);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
    @PutMapping("/edit/{id}")
    public HttpEntity<?>update(@PathVariable long id,@RequestBody Measurement measurement){
        ApiResponse apiResponse = measurementService.edit(id,measurement);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
    @GetMapping("/list")
    public HttpEntity<?>getAll(){
        List<Measurement> all = measurementService.getAll();
        return ResponseEntity.ok(all);
    }
    @GetMapping("/getOne/{id}")
    public HttpEntity<?> getOne(@PathVariable long id){
        ApiResponse apiResponse = measurementService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }



}
