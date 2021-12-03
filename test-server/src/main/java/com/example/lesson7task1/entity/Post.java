package com.example.lesson7task1.entity;

import com.example.lesson7task1.entity.teplate.AbstractEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Post extends AbstractEntity {
    @Column(nullable = false, columnDefinition = "text")
    private String title;
    @Column(nullable = false, columnDefinition = "text")
    private String text;
    @Column(nullable = false, columnDefinition = "text")
    private String url;


    @CreatedBy
    private Long createdBy;

    @LastModifiedBy
    private Long updateBy;

    public Post(String title, String text, String url) {
        this.title = title;
        this.text = text;
        this.url = url;
    }
}
