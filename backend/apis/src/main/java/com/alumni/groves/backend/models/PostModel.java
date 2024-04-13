package com.alumni.groves.backend.models;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Posts")
public class PostModel {
    @Id
    private String id;

    private String userId;

    private String title;

    private String content;

    private String image1;

    private String image2;

    private Instant createdAt;
}
