package com.alumni.groves.backend.models;

import java.time.Instant;
import java.util.List;

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

    private String firstName;

    private String lastName;

    private String title;

    private String content;

    private String image1;

    private String image2;

    private int likeCount;

    private List<String> like;

    private List<CommentStructureModel> comment;

    private List<CommentModel> commentModel;

    private Instant createdAt;
}
