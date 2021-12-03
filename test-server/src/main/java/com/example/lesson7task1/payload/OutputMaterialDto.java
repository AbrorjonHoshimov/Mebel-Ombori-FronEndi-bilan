package com.example.lesson7task1.payload;

import lombok.Data;

import java.util.Date;

@Data
public class OutputMaterialDto {
    private long materialId;
     private int amount;
     private String comment;

}
