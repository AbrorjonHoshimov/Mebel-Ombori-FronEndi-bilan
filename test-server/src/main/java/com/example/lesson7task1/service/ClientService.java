package com.example.lesson7task1.service;

import com.example.lesson7task1.entity.Client;
import com.example.lesson7task1.entity.OutputProduct;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.repository.ClientRepository;
import com.example.lesson7task1.repository.OutputProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    OutputProductRepository outputProductRepository;
    @Autowired
    ClientRepository clientRepository;
    public ApiResponse add(Client client) {
        Client client1 =new Client();
        client1.setName(client.getName());
        client1.setPhone(client.getPhone());
        clientRepository.save(client1);
        return new ApiResponse("saved",true);
    }

    public ApiResponse edit(long id, Client client) {
        Optional<Client> optionalClient = clientRepository.findById(id);
        if (!optionalClient.isPresent())return new ApiResponse("not found",false);
        Client client1 = optionalClient.get();
        client1.setName(client.getName());
        client1.setPhone(client.getPhone());
        clientRepository.save(client1);
        return new ApiResponse("edit",true);
    }

    public List<Client> getAll() {
        return clientRepository.findAll();
    }

    public ApiResponse getOne(long id) {
        Optional<Client> optionalClient = clientRepository.findById(id);
        if (!optionalClient.isPresent())return new ApiResponse("not found",false);
        return new ApiResponse("Ok",true,optionalClient.get());

    }

    public ApiResponse delete(long id) {
        Optional<Client> optionalClient = clientRepository.findById(id);
        if (!optionalClient.isPresent())return new ApiResponse("not found",false);
        clientRepository.deleteById(id);
        return new ApiResponse("Deleted",true);
    }


    public List<OutputProduct> getOneClientfromOutProd(long id) {
       return outputProductRepository.findAllByClient_Id(id);
    }
}
