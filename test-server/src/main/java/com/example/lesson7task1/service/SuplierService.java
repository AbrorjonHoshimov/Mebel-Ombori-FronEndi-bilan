package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.MaterialInput;
import com.example.lesson7task1.entity.Supplier;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.repository.MaterialInputRepository;
import com.example.lesson7task1.repository.SuplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SuplierService {
    @Autowired
    SuplierRepository suplierRepository;
    @Autowired
    MaterialInputRepository materialInputRepository;
    public ApiResponse add(Supplier supplier) {
        Supplier supplier1 = new Supplier();
        supplier1.setName(supplier.getName());
        supplier1.setPhone(supplier.getPhone());
        suplierRepository.save(supplier1);
        return new ApiResponse("saved",true);
    }

    public ApiResponse edit(long id, Supplier supplier) {
        Optional<Supplier> byId = suplierRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not found",false);
        Supplier supplier1 = byId.get();
        supplier1.setName(supplier.getName());
        supplier1.setPhone(supplier.getPhone());
        suplierRepository.save(supplier1);
        return new ApiResponse("saved",true);
    }

    public List<Supplier> getAll() {
        return suplierRepository.findAll();
    }

    public ApiResponse getOne(long id) {
        Optional<Supplier> byId = suplierRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not found",false);
        return new ApiResponse("Ok",true,byId.get());

    }

    public ApiResponse delete(long id) {
        Optional<Supplier> byId = suplierRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not found",false);
        suplierRepository.deleteById(id);
        return new ApiResponse("Deleted",true);
    }

    public List<MaterialInput> getOneMaterialSuplier(long id) {
       return materialInputRepository.findAllBySupplier_Id(id);
    }
}
