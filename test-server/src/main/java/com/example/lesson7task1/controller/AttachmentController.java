package com.example.lesson7task1.controller;

import com.example.lesson7task1.entity.Attachment;
import com.example.lesson7task1.entity.AttachmentContent;
import com.example.lesson7task1.payload.ApiResponse;
import com.example.lesson7task1.repository.AttachmenContentRepostory;
import com.example.lesson7task1.repository.AttachmentRepostory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/attachment")
public class AttachmentController {

    @Autowired
    AttachmentRepostory attachmentRepostory;

    @Autowired
    AttachmenContentRepostory attachmenContentRepostory;

    @PostMapping("/upload")
    public ApiResponse saveDb(MultipartHttpServletRequest request) throws IOException {
        Iterator<String> fileNames = request.getFileNames();
        MultipartFile file = request.getFile(fileNames.next());
        if (file!=null){
            Attachment attachment =new Attachment();
            attachment.setOriginalName(file.getOriginalFilename());
            attachment.setSize(file.getSize());
            attachment.setType(file.getContentType());

            Attachment save = attachmentRepostory.save(attachment);

            AttachmentContent attachmentContent =new AttachmentContent();

            attachmentContent.setBytes(file.getBytes());

            attachmentContent.setAttachment(save);

            attachmenContentRepostory.save(attachmentContent);
            return new ApiResponse("saved",true);
        }
        return new ApiResponse("dont saved",false);
    }
    @GetMapping("/info")
    public List<Attachment> getall(){
        List<Attachment> all = attachmentRepostory.findAll();
        return all;
    }
    @GetMapping("/info/{id}")
    public ApiResponse getOne(@PathVariable Integer id){
        Optional<Attachment> byId = attachmentRepostory.findById(id);
        if (!byId.isPresent())return new ApiResponse("not found",false);

        return new ApiResponse("ok",true,byId.get());
    }

    @GetMapping("/download/{id}")
    public void getFromDb(@PathVariable int id, HttpServletResponse response) throws IOException {
        Optional<Attachment> byId = attachmentRepostory.findById(id);
        if (byId.isPresent()){
            Attachment attachment = byId.get();
            Optional<AttachmentContent> byAttachmentId = attachmenContentRepostory.findByAttachmentId(id);
            AttachmentContent attachmentContent = byAttachmentId.get();
            if (byAttachmentId.isPresent()){
                response.setContentType(attachment.getType());
                response.setHeader("Content-Disposition",attachment.getOriginalName()+"/:"+attachment.getSize());
                FileCopyUtils.copy(attachmentContent.getBytes(),response.getOutputStream());
            }

        }

    }

}
