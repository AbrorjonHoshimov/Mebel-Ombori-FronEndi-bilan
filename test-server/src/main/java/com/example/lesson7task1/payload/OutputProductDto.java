package com.example.lesson7task1.payload;

import lombok.Data;

import javax.persistence.OneToOne;
import java.util.Date;

@Data
public class OutputProductDto {
    private long clientId;
    private long productTypeId;
    private long productId;
    private int amount;
    private double price;
}
