package com.example.lesson7task1.payload;

import com.example.lesson7task1.entity.Attachment;
import com.example.lesson7task1.entity.ProductType;
import lombok.Data;

import javax.persistence.OneToOne;

@Data
public class ProductDto {
    private String nameUz;
    private String nameRu;
    private long productTypeId;
}
