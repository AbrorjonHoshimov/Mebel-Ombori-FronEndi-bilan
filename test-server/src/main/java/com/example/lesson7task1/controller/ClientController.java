package com.example.lesson7task1.controller;

import com.example.lesson7task1.entity.Client;
import com.example.lesson7task1.entity.OutputProduct;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/client")
public class ClientController {
    @Autowired
    ClientService clientService;

    @PostMapping("/add")
    public HttpEntity<?>add(@RequestBody Client client){
       ApiResponse apiResponse= clientService.add(client);
       return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
    @PutMapping("/edit/{id}")
    public HttpEntity<?> edit(@PathVariable long id,@RequestBody Client client){
        ApiResponse apiResponse= clientService.edit(id,client);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
    @GetMapping("/list")
    public HttpEntity<?> getAll(){
        List<Client> all = clientService.getAll();
        return ResponseEntity.ok(all);
    }
    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable long id){
        ApiResponse apiResponse= clientService.getOne(id);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
    @DeleteMapping("/{id}")
    public HttpEntity<?>delete(@PathVariable long id){
        ApiResponse apiResponse= clientService.delete(id);
        return ResponseEntity.status(apiResponse.isSuccess()?201:409).body(apiResponse);
    }
    @GetMapping("/getOneClientFromOutputProduct/{id}")
    public HttpEntity<?> getOneClientfromOutProd(@PathVariable long id){
        List<OutputProduct> oneClientfromOutProd = clientService.getOneClientfromOutProd(id);
        return ResponseEntity.ok(oneClientfromOutProd);
    }

}
