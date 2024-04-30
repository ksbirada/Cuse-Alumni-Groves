package com.alumni.groves.backend.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentPostRequestModel {
    private CommentModel commentModel;
    private IdObjectModel postId;
}
