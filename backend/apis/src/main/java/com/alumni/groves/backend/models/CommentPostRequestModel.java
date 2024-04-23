package com.alumni.groves.backend.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentPostRequestModel {
    private CommentModel CommentData;
    private IdObjectModel postId;
}
