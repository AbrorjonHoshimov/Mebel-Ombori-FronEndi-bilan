package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.Material;
import com.example.lesson7task1.entity.MaterialInput;
import com.example.lesson7task1.entity.MaterialOutput;
import com.example.lesson7task1.entity.MaterialWareHouse;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.OutputMaterialDto;
import com.example.lesson7task1.repository.MaterialInputRepository;
import com.example.lesson7task1.repository.MaterialOutputRepository;
import com.example.lesson7task1.repository.MaterialRepository;
import com.example.lesson7task1.repository.MaterialWareHouseRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OutputMaterialService {
    @Autowired
    MaterialOutputRepository materialOutputRepository;
    @Autowired
    MaterialRepository materialRepository;
    @Autowired
    MaterialWareHouseRepository materialWareHouseRepository;
    public ApiResponse add(OutputMaterialDto outputMaterialDto) {
        Optional<MaterialWareHouse> byMaterial_id1 = materialWareHouseRepository.findByMaterial_Id(outputMaterialDto.getMaterialId());
        MaterialWareHouse materialWareHouse1 = byMaterial_id1.get();
        if (materialWareHouse1.getAmount()<outputMaterialDto.getAmount())return new ApiResponse("Omborda Buncha maxsulot mavjud emas",false);
        MaterialOutput materialOutput =new MaterialOutput();
        Optional<Material> optionalMaterial = materialRepository.findById(outputMaterialDto.getMaterialId());
        if (!optionalMaterial.isPresent()) return new ApiResponse("Not found",false);
        materialOutput.setMaterial(optionalMaterial.get());
        Optional<MaterialWareHouse> byMaterial_id = materialWareHouseRepository.findByMaterial_Id(outputMaterialDto.getMaterialId());
        MaterialWareHouse materialWareHouse = byMaterial_id.get();
        materialWareHouse.setAmount(materialWareHouse.getAmount()- outputMaterialDto.getAmount());
        materialWareHouseRepository.save(materialWareHouse);
        materialOutput.setAmount(outputMaterialDto.getAmount());
        materialOutput.setComment(outputMaterialDto.getComment());
        LocalDateTime localDateTime = LocalDateTime.now();

        materialOutput.setDate(new Date());
        materialOutputRepository.save(materialOutput);
        return new ApiResponse("saved",true);
    }

    public ApiResponse edit(long id, OutputMaterialDto outputMaterialDto) {
        Optional<MaterialOutput> materialOutputOptional = materialOutputRepository.findById(id);
        if (!materialOutputOptional.isPresent())return new ApiResponse("Not found",false);
        MaterialOutput materialOutput = materialOutputOptional.get();
        Optional<Material> optionalMaterial = materialRepository.findById(outputMaterialDto.getMaterialId());
        if (!optionalMaterial.isPresent()) return new ApiResponse("Not found",false);
        materialOutput.setMaterial(optionalMaterial.get());
        materialOutput.setAmount(outputMaterialDto.getAmount());
        materialOutput.setComment(outputMaterialDto.getComment());
        materialOutput.setDate(new Date());
        materialOutputRepository.save(materialOutput);
        return new ApiResponse("edited",true);
    }

    public List<MaterialOutput> getAll() {
       return materialOutputRepository.findAll();
    }

    public ApiResponse getOne(long id) {
        Optional<MaterialOutput> materialOutputOptional = materialOutputRepository.findById(id);
        if (!materialOutputOptional.isPresent())return new ApiResponse("Not found",false);
        return new ApiResponse("ok",true,materialOutputOptional.get());
    }

    public ApiResponse delete(long id) {
        Optional<MaterialOutput> materialOutputOptional = materialOutputRepository.findById(id);
        if (!materialOutputOptional.isPresent())return new ApiResponse("Not found",false);
        materialOutputRepository.deleteById(id);
        return new ApiResponse("deleted",true);
    }
}
