package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.*;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.payload.OutputProductDto;
import com.example.lesson7task1.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OutputProductService {
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductTypeRepository productTypeRepository;
    @Autowired
    OutputProductRepository outputProductRepository;
    @Autowired
    ProductWareHouseRepository productWareHouseRepository;
    public ApiResponse add(OutputProductDto outputProductDto) {
        Optional<ProductWareHouse> byProduct_idAndProductType_id = productWareHouseRepository.findByProduct_IdAndProductType_Id(outputProductDto.getProductId(), outputProductDto.getProductTypeId());
        ProductWareHouse productWareHouse = byProduct_idAndProductType_id.get();
        if (productWareHouse.getAmount()< outputProductDto.getAmount()){
            return new ApiResponse("Ombordagi maxsulot yetarli emas",false);
        }else {
            productWareHouse.setAmount(productWareHouse.getAmount()- outputProductDto.getAmount());
            productWareHouseRepository.save(productWareHouse);
        }
        OutputProduct outputProduct = new OutputProduct();
        outputProduct.setAmount(outputProductDto.getAmount());
        outputProduct.setPrice(outputProductDto.getPrice());
        Optional<Product> optionalProduct = productRepository.findById(outputProductDto.getProductId());
        if (!optionalProduct.isPresent()) return new ApiResponse("Not found",false);
        outputProduct.setProduct(optionalProduct.get());
        Optional<ProductType> optionalProductType = productTypeRepository.findById(outputProductDto.getProductTypeId());
        if (!optionalProductType.isPresent()) return new ApiResponse("not found",false);
        outputProduct.setProductType(optionalProductType.get());
        Optional<Client> optionalClient = clientRepository.findById(outputProductDto.getClientId());
        if (!optionalClient.isPresent())return new ApiResponse("Not found",false);
        outputProduct.setClient(optionalClient.get());
        outputProduct.setOutDate(new Date());
        outputProductRepository.save(outputProduct);
        return new ApiResponse("saved",true);
    }

    public ApiResponse edit(long id, OutputProductDto outputProductDto) {
        Optional<OutputProduct> optionalOutputProduct = outputProductRepository.findById(id);
        if (!optionalOutputProduct.isPresent()) return  new ApiResponse("Not found",false);
        OutputProduct outputProduct = optionalOutputProduct.get();
        outputProduct.setAmount(outputProductDto.getAmount());
        outputProduct.setPrice(outputProductDto.getPrice());
        Optional<Product> optionalProduct = productRepository.findById(outputProductDto.getProductId());
        if (!optionalProduct.isPresent()) return new ApiResponse("Not found",false);
        outputProduct.setProduct(optionalProduct.get());
        Optional<ProductType> optionalProductType = productTypeRepository.findById(outputProductDto.getProductTypeId());
        if (!optionalProductType.isPresent()) return new ApiResponse("not found",false);
        outputProduct.setProductType(optionalProductType.get());
        Optional<Client> optionalClient = clientRepository.findById(outputProductDto.getClientId());
        if (!optionalClient.isPresent())return new ApiResponse("Not found",false);
        outputProduct.setClient(optionalClient.get());
        outputProduct.setOutDate(new Date());
        outputProductRepository.save(outputProduct);
        return new ApiResponse("edited",true);
    }

    public List<OutputProduct> getAll() {
        return outputProductRepository.findAll();
    }

    public ApiResponse getOne(long id) {
        Optional<OutputProduct> optionalOutputProduct = outputProductRepository.findById(id);
        if (!optionalOutputProduct.isPresent()) return  new ApiResponse("Not found",false);
        return new ApiResponse("ok",true,optionalOutputProduct.get());
    }

    public ApiResponse delete(long id) {
        Optional<OutputProduct> optionalOutputProduct = outputProductRepository.findById(id);
        if (!optionalOutputProduct.isPresent()) return  new ApiResponse("Not found",false);
        outputProductRepository.deleteById(id);
        return new ApiResponse("Deleted",true);
    }
}
