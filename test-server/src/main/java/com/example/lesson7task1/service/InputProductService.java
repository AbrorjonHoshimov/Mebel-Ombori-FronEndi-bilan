package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.InputProduct;
import com.example.lesson7task1.entity.Product;
import com.example.lesson7task1.entity.ProductType;
import com.example.lesson7task1.entity.ProductWareHouse;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.InputProductDto;
import com.example.lesson7task1.repository.InputProductRepository;
import com.example.lesson7task1.repository.ProductRepository;
import com.example.lesson7task1.repository.ProductTypeRepository;
import com.example.lesson7task1.repository.ProductWareHouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class InputProductService {
    @Autowired
    ProductTypeRepository productTypeRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    InputProductRepository inputProductRepository;
    @Autowired
    ProductWareHouseRepository productWareHouseRepository;

    public ApiResponse add(InputProductDto inputProductDto) {
        InputProduct inputProduct = new InputProduct();
        Optional<Product> optionalProduct = productRepository.findById(inputProductDto.getProductId());
        if (!optionalProduct.isPresent()) return new ApiResponse("Not found",false);
        inputProduct.setProduct(optionalProduct.get());
        Optional<ProductType> optionalProductType = productTypeRepository.findById(inputProductDto.getProductTypeId());
        if (!optionalProductType.isPresent()) return new ApiResponse("Not found",false);
        inputProduct.setProductType(optionalProductType.get());
        boolean exists = productWareHouseRepository.existsByProduct_IdAndProductType_Id(inputProductDto.getProductId(), inputProductDto.getProductTypeId());
        if (exists){
            Optional<ProductWareHouse> byProduct_idAndProductType_id = productWareHouseRepository.findByProduct_IdAndProductType_Id(inputProductDto.getProductId(), inputProductDto.getProductTypeId());
            ProductWareHouse productWareHouse1 = byProduct_idAndProductType_id.get();
            productWareHouse1.setAmount(productWareHouse1.getAmount()+ inputProductDto.getAmount());
            productWareHouse1.setOveralPrice(productWareHouse1.getAmount()* inputProductDto.getPrice());
            productWareHouseRepository.save(productWareHouse1);
        }else {
            ProductWareHouse productWareHouse =new ProductWareHouse();
            productWareHouse.setProduct(optionalProduct.get());
            productWareHouse.setProductType(optionalProductType.get());
            productWareHouse.setAmount(inputProductDto.getAmount());
            productWareHouse.setOveralPrice(inputProductDto.getAmount()* inputProductDto.getPrice());
            productWareHouseRepository.save(productWareHouse);
        }

        inputProduct.setAmount(inputProductDto.getAmount());
        inputProduct.setPrice(inputProductDto.getPrice());
        inputProduct.setInputDate(new Date());
        inputProductRepository.save(inputProduct);
        return new ApiResponse("saved",true);
    }

    public ApiResponse edit(long id, InputProductDto inputProductDto) {
        Optional<InputProduct> optionalInputProduct = inputProductRepository.findById(id);
        if (!optionalInputProduct.isPresent()) return new ApiResponse("Not found",false);
        InputProduct inputProduct = optionalInputProduct.get();
        Optional<Product> optionalProduct = productRepository.findById(inputProductDto.getProductId());
        if (!optionalProduct.isPresent()) return new ApiResponse("Not found",false);
        inputProduct.setProduct(optionalProduct.get());
        Optional<ProductType> optionalProductType = productTypeRepository.findById(inputProductDto.getProductTypeId());
        if (!optionalProductType.isPresent()) return new ApiResponse("Not found",false);
        inputProduct.setProductType(optionalProductType.get());
        inputProduct.setAmount(inputProductDto.getAmount());
        inputProduct.setPrice(inputProductDto.getPrice());
        inputProductRepository.save(inputProduct);
        return new ApiResponse("edited",true);
    }

    public List<InputProduct> getAll() {
        return inputProductRepository.findAll();
    }

    public ApiResponse getOne(long id) {
        Optional<InputProduct> optionalInputProduct = inputProductRepository.findById(id);
        if (!optionalInputProduct.isPresent()) return new ApiResponse("Not found",false);
        return new ApiResponse("OK",true,optionalInputProduct.get());
    }

    public ApiResponse delete(long id) {
        Optional<InputProduct> optionalInputProduct = inputProductRepository.findById(id);
        if (!optionalInputProduct.isPresent()) return new ApiResponse("Not found",false);
        inputProductRepository.deleteById(id);
        return new ApiResponse("deleted",true);
    }
}
