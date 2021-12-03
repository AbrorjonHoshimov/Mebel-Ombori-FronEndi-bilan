package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.Product;
import com.example.lesson7task1.entity.ProductType;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.ProductDto;
import com.example.lesson7task1.repository.ProductRepository;
import com.example.lesson7task1.repository.ProductTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductTypeRepository productTypeRepository;

    public ApiResponse add(ProductDto productDto) {
        Product product = new Product();
        product.setNameRu(productDto.getNameRu());
        product.setNameUz(productDto.getNameUz());
        Optional<ProductType> byId = productTypeRepository.findById(productDto.getProductTypeId());
        if (!byId.isPresent()) return new ApiResponse("Not found", false);
        product.setProductType(byId.get());
        productRepository.save(product);
        return new ApiResponse("Saved", true);
    }

    public ApiResponse edit(long id, ProductDto productDto) {

        Optional<Product> optionalProduct = productRepository.findById(id);
        if (!optionalProduct.isPresent()) return new ApiResponse("Not found", false);
        Product product = optionalProduct.get();
        product.setNameRu(productDto.getNameRu());
        product.setNameUz(productDto.getNameUz());
        Optional<ProductType> byId = productTypeRepository.findById(productDto.getProductTypeId());
        if (!byId.isPresent()) return new ApiResponse("Not found", false);
        product.setProductType(byId.get());
        productRepository.save(product);
        return new ApiResponse("Edited", true);
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public ApiResponse getOne(long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (!optionalProduct.isPresent()) return new ApiResponse("Not found", false);
        return new ApiResponse("ok",true,optionalProduct.get());
    }

    public ApiResponse delete(long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (!optionalProduct.isPresent()) return new ApiResponse("Not found", false);
        productRepository.deleteById(id);
        return new ApiResponse("Deleted",true);
    }
}
