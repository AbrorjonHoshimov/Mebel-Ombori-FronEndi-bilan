package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.Material;
import com.example.lesson7task1.entity.Measurement;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.MaterialDto;
import com.example.lesson7task1.repository.MaterialRepository;
import com.example.lesson7task1.repository.MeasurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialService {
    @Autowired
    MeasurementRepository measurementRepository;
    @Autowired
    MaterialRepository materialRepository;

    public ApiResponse add(MaterialDto materialDto) {
        Material material = new Material();
        material.setNameRu(materialDto.getNameRu());
        material.setNameUZ(materialDto.getNameUZ());
        material.setNorma(material.getNorma());
        Optional<Measurement> optionalMeasurement = measurementRepository.findById(materialDto.getMeasurementId());
        if (!optionalMeasurement.isPresent()) return new ApiResponse("Not found",false);
        material.setMeasurement(optionalMeasurement.get());
        material.setCode(materialDto.getCode());
        materialRepository.save(material);
        return new ApiResponse("Saved",true);
    }

    public ApiResponse edit(long id, MaterialDto materialDto) {
        Optional<Material> byId = materialRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not found",false);
        Material material = byId.get();
        material.setNameRu(materialDto.getNameRu());
        material.setNameUZ(materialDto.getNameUZ());
        material.setNorma(material.getNorma());
        Optional<Measurement> optionalMeasurement = measurementRepository.findById(materialDto.getMeasurementId());
        if (!optionalMeasurement.isPresent()) return new ApiResponse("Not found",false);
        material.setMeasurement(optionalMeasurement.get());
        material.setCode(materialDto.getCode());
        materialRepository.save(material);
        return new ApiResponse("Saved",true);
    }

    public List<Material> getAll() {
        return materialRepository.findAll();
    }

    public ApiResponse getOne(long id) {
        Optional<Material> byId = materialRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not found",false);
        return new ApiResponse("ok",true,byId.get());
    }

    public ApiResponse delete(long id) {
        Optional<Material> byId = materialRepository.findById(id);
        if (!byId.isPresent()) return new ApiResponse("Not found",false);
        materialRepository.deleteById(id);
        return new ApiResponse("Deleted",true);
    }
}
