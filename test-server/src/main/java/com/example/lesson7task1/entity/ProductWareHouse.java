package com.example.lesson7task1.entity;

import com.example.lesson7task1.entity.teplate.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@EqualsAndHashCode(callSuper = true)
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductWareHouse extends AbstractEntity {
   @ManyToOne
   private Product product;
   @ManyToOne
   private ProductType productType;

   private long amount;

   private double overalPrice;
}
