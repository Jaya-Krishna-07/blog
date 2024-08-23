package com.blog.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    @Column(length = 5000)
    @Size(min = 10, max = 4000)
    private String content;

    @NotNull
    private String postedBy;

    @NotNull
    private String image;
    private Date date;

    private int likeCount;                                                                                                                                                              
    private int viewCount;

    private List<String> tags;
}
