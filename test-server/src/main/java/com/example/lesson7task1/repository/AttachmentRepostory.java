package com.example.lesson7task1.repository;

import com.example.lesson7task1.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepostory extends JpaRepository<Attachment,Integer> {

}
