package com.example.lesson7task1.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostDto {
    @NotNull
    private String title;
    @NotNull
    private String text;
    @NotNull
    private String url;

}
