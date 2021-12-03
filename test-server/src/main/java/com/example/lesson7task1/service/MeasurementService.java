package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.Measurement;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.repository.MeasurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MeasurementService {
    @Autowired
    MeasurementRepository measurementRepository;

    public ApiResponse add(Measurement measurement) {
        Measurement measurement1=new Measurement();
        measurement1.setNameRu(measurement.getNameRu());
        measurement1.setNameUz(measurement.getNameUz());
        measurementRepository.save(measurement1);
        return new ApiResponse("saved",true);
    }


    public ApiResponse edit(long id, Measurement measurement) {
        Optional<Measurement> optionalMeasurement = measurementRepository.findById(id);
        if (!optionalMeasurement.isPresent()) return new ApiResponse("not found",false);
        Measurement measurement1 = optionalMeasurement.get();
        measurement1.setNameRu(measurement.getNameRu());
        measurement1.setNameUz(measurement.getNameUz());
        measurementRepository.save(measurement1);
        return new ApiResponse("edited",true);
    }

    public List<Measurement> getAll() {
       return measurementRepository.findAll();
    }


    public ApiResponse getOne(long id) {
        Optional<Measurement> optionalMeasurement = measurementRepository.findById(id);
        if (!optionalMeasurement.isPresent()) return new ApiResponse("not found",false);
        return new ApiResponse("ok",true,optionalMeasurement.get());
    }
}
