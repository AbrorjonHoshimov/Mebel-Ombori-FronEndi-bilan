package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.Material;
import com.example.lesson7task1.entity.MaterialInput;
import com.example.lesson7task1.entity.MaterialWareHouse;
import com.example.lesson7task1.entity.Supplier;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.InputMatDto;
import com.example.lesson7task1.repository.MaterialInputRepository;
import com.example.lesson7task1.repository.MaterialRepository;
import com.example.lesson7task1.repository.MaterialWareHouseRepository;
import com.example.lesson7task1.repository.SuplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class InputMaterialService {
    @Autowired
    MaterialWareHouseRepository materialWareHouseRepository;
    @Autowired
    MaterialRepository materialRepository;
    @Autowired
    SuplierRepository suplierRepository;
    @Autowired
    MaterialInputRepository materialInputRepository;

    public ApiResponse add(InputMatDto inputMatDto) {

        MaterialInput materialInput = new MaterialInput();
        Optional<Material> byId = materialRepository.findById(inputMatDto.getMaterialId());
        if (!byId.isPresent()) return new ApiResponse("Not Found", false);
        materialInput.setMaterial(byId.get());
        boolean exists = materialWareHouseRepository.existsByMaterial_Id(inputMatDto.getMaterialId());
        if (exists){
            Optional<MaterialWareHouse> byMaterial_id = materialWareHouseRepository.findByMaterial_Id(inputMatDto.getMaterialId());
            MaterialWareHouse materialWareHouse1 = byMaterial_id.get();
           materialWareHouse1.setAmount(materialWareHouse1.getAmount()+ inputMatDto.getAmount());
           materialWareHouse1.setPrice(materialWareHouse1.getAmount()*inputMatDto.getPrice());
            materialWareHouseRepository.save(materialWareHouse1);
        }else {
            MaterialWareHouse materialWareHouse = new MaterialWareHouse();
            materialWareHouse.setMaterial(byId.get());
            materialWareHouse.setAmount(inputMatDto.getAmount());
            materialWareHouse.setPrice(inputMatDto.getAmount()* inputMatDto.getPrice());
            materialWareHouseRepository.save(materialWareHouse);
        }
        Optional<Supplier> optionalSupplier = suplierRepository.findById(inputMatDto.getSupplierId());
        if (!optionalSupplier.isPresent()) return new ApiResponse("Not Found", false);
        materialInput.setSupplier(optionalSupplier.get());
        materialInput.setAmount(inputMatDto.getAmount());

        materialInput.setPrice(inputMatDto.getPrice());
        materialInput.setDate(new Date());
        materialInputRepository.save(materialInput);

        return new ApiResponse("saved", true);
    }

    public ApiResponse edit(long id, InputMatDto inputMatDto) {
        Optional<MaterialInput> materialInputOptional = materialInputRepository.findById(id);
        if (!materialInputOptional.isPresent()) return new ApiResponse("Not Found", false);
        MaterialInput materialInput = materialInputOptional.get();
        Optional<Material> byId = materialRepository.findById(inputMatDto.getMaterialId());
        if (!byId.isPresent()) return new ApiResponse("Not Found", false);
        materialInput.setMaterial(byId.get());
        Optional<Supplier> optionalSupplier = suplierRepository.findById(inputMatDto.getSupplierId());
        if (!optionalSupplier.isPresent()) return new ApiResponse("Not Found", false);
        materialInput.setSupplier(optionalSupplier.get());
        materialInput.setAmount(inputMatDto.getAmount());
        materialInput.setPrice(inputMatDto.getPrice());
        materialInput.setDate(new Date());
        materialInputRepository.save(materialInput);
        return new ApiResponse("edited", true);
    }

    public List<MaterialInput> getAll() {
        return materialInputRepository.findAll();
    }

    public ApiResponse getOne(long id) {
        Optional<MaterialInput> materialInputOptional = materialInputRepository.findById(id);
        if (!materialInputOptional.isPresent()) return new ApiResponse("Not Found", false);
        return new ApiResponse("Ok", true, materialInputOptional.get());

    }

    public ApiResponse delete(long id) {
        Optional<MaterialInput> materialInputOptional = materialInputRepository.findById(id);
        if (!materialInputOptional.isPresent()) return new ApiResponse("Not Found", false);
        materialInputRepository.deleteById(id);
        return new ApiResponse("Deleted", true);
    }
}
