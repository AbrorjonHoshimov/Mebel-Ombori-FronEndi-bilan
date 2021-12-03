package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.ProductType;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.repository.ProductTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductTypeService {
    @Autowired
    ProductTypeRepository productTypeRepository;

    public ApiResponse add(ProductType productType) {
        ProductType productType1 = new ProductType();
        productType1.setNameRu(productType.getNameRu());
        productType1.setNameUz(productType.getNameUz());
        productTypeRepository.save(productType1);
        return new ApiResponse("saved",true);
    }

    public ApiResponse edit(long id, ProductType productType) {
        Optional<ProductType> optionalProductType = productTypeRepository.findById(id);
        if (!optionalProductType.isPresent())return new ApiResponse("not found",false);
        ProductType productType1 = optionalProductType.get();
        productType1.setNameRu(productType.getNameRu());
        productType1.setNameUz(productType.getNameUz());
        productTypeRepository.save(productType1);
        return new ApiResponse("edited",true);
    }

    public List<ProductType> all() {
        List<ProductType> all = productTypeRepository.findAll();
        return all;
    }

    public ApiResponse getOne(long id) {
        Optional<ProductType> optionalProductType = productTypeRepository.findById(id);
        if (!optionalProductType.isPresent())return new ApiResponse("not found",false);
        return new ApiResponse("ok",true,optionalProductType.get());
    }

    public ApiResponse delete(long id) {
        Optional<ProductType> optionalProductType = productTypeRepository.findById(id);
        if (!optionalProductType.isPresent())return new ApiResponse("not found",false);
        productTypeRepository.deleteById(id);
        return new ApiResponse("deleted",true);
    }
}
