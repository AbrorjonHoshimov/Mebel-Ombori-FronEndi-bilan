package com.example.lesson7task1.entity;

import com.example.lesson7task1.entity.teplate.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class OutputProduct extends AbstractEntity {
    @OneToOne
    private Client client;
    @OneToOne
    private ProductType productType;
    @OneToOne
    private Product product;
    private int amount;
    private double price;

    private Date outDate;
}
