package com.alumni.groves.backend.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.alumni.groves.backend.models.CommentModel;
import com.alumni.groves.backend.models.PostModel;
import com.alumni.groves.backend.models.ResponseObject;
import com.alumni.groves.backend.repository.CommentRepository;
import com.alumni.groves.backend.repository.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepo;

    @Autowired
    private PostRepository postRepo;

    @Autowired
    private PostService postService;

    public ResponseObject insertComment(CommentModel inputComment, String inputPostId) {
        ResponseObject responseObj = new ResponseObject();
        Optional<PostModel> optPost = postRepo.findById(inputPostId);
        if (optPost.isEmpty()) {
            responseObj.setStatus("fail");
            responseObj.setMessage("cannot find target post id: " + inputPostId);
            responseObj.setPayload(null);
            return responseObj;
        } else {
            inputComment.setCreatedAt(Instant.now());
            commentRepo.save(inputComment);
            PostModel targetPost = optPost.get();
            List<CommentModel> commentList = targetPost.getCommentModel();
            if (commentList == null) {
                commentList = new ArrayList<>();
            }
            commentList.add(inputComment);
            targetPost.setCommentModel(commentList);
            postService.updatePostByComment(targetPost);
            responseObj.setStatus("success");
            responseObj.setMessage("success");
            responseObj.setPayload(inputComment);
            return responseObj;
        }
    }

}
