package com.alumni.groves.backend.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.alumni.groves.backend.models.CommentModel;
import com.alumni.groves.backend.models.CommentStructureModel;
import com.alumni.groves.backend.models.PostModel;
import com.alumni.groves.backend.models.ResponseObject;
import com.alumni.groves.backend.repository.CommentRepository;
import com.alumni.groves.backend.repository.PostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
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
        try {
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
            List<CommentStructureModel> commentList = targetPost.getComment();
            if (commentList == null) {
                commentList = new ArrayList<>();
            }
            CommentStructureModel comment=new CommentStructureModel(inputComment.getUserFullname(),inputComment.getContent());
            commentList.add(comment);
            
            targetPost.setComment(commentList);
            responseObj=postService.updatePostByComment(targetPost);
            return responseObj;
        }
    } catch (DataAccessException ex) {
        System.out.println("Exception occurred while inserting comment: " + ex.getMessage());
        responseObj.setStatus("fail");
        responseObj.setMessage("Internal server error occurred while inserting comment");
        responseObj.setPayload(null);
        return responseObj;
    }
    }

}
