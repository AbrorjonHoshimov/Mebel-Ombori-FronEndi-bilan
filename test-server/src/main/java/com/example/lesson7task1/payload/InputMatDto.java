package com.example.lesson7task1.payload;

import com.example.lesson7task1.entity.Material;
import com.example.lesson7task1.entity.Supplier;
import lombok.Data;

import javax.persistence.ManyToOne;
import java.util.Date;

@Data
public class InputMatDto {
    private long materialId;
    private long supplierId;
    private long amount;
    private double price;
}
