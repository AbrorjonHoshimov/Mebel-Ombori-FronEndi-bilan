package com.example.lesson7task1.entity;

import com.example.lesson7task1.entity.teplate.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Material extends AbstractEntity {
    private String code, nameUZ, nameRu;
    private int norma;
    @OneToOne
    private Attachment attachment;

    @OneToOne
    private Measurement measurement;

}
