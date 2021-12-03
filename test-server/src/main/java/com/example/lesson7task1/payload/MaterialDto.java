package com.example.lesson7task1.payload;

import lombok.Data;

@Data
public class MaterialDto {
    private String code, nameUZ, nameRu;
    private int norma;
    private long measurementId;
}
