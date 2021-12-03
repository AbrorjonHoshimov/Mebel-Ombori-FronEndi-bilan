package com.example.lesson7task1.payload;

import com.example.lesson7task1.entity.Product;
import com.example.lesson7task1.entity.ProductType;
import lombok.Data;

import javax.persistence.OneToOne;
import java.util.Date;

@Data
public class InputProductDto {

    private long productTypeId;
    private long productId;
    private int amount;
    private double price;

}
