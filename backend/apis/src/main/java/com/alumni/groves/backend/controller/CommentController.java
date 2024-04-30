package com.alumni.groves.backend.controller;

import com.alumni.groves.backend.models.CommentModel;
import com.alumni.groves.backend.models.CommentPostRequestModel;
import com.alumni.groves.backend.models.IdObjectModel;
import com.alumni.groves.backend.service.CommentService;
import com.alumni.groves.backend.models.ResponseObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/insertcomment")
    public ResponseEntity<ResponseObject> insertComment(@RequestBody CommentPostRequestModel postedComment) {
        CommentModel inputComment = postedComment.getCommentModel();
        IdObjectModel inputPostId = postedComment.getPostId();
        return new ResponseEntity<ResponseObject>(commentService.insertComment(inputComment, inputPostId.getId()), HttpStatus.OK);
    }

}
