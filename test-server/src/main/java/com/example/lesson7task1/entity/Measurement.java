package com.example.lesson7task1.entity;

import com.example.lesson7task1.entity.teplate.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Measurement extends AbstractEntity {
    private String nameUz;
    private String nameRu;
}
