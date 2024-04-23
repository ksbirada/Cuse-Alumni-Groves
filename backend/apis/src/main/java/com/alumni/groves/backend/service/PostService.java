package com.alumni.groves.backend.service;


import com.alumni.groves.backend.models.PostModel;
import com.alumni.groves.backend.models.ResponseObject;
import com.alumni.groves.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository repo;

    public ResponseObject insertPost(PostModel inputPost) {
        ResponseObject responseObj = new ResponseObject();
        inputPost.setCreatedAt(Instant.now());
        responseObj.setStatus("success");
        responseObj.setMessage("success");
        responseObj.setPayload(repo.save(inputPost));
        return responseObj;
    }

    public ResponseObject getAllPosts(){
        ResponseObject responseObj = new ResponseObject();
        responseObj.setStatus("success");
        responseObj.setMessage("success");
        responseObj.setPayload(repo.findAll(Sort.by(Sort.Direction.DESC, "createdAt")));
        return responseObj;
    }

    public ResponseObject getAllPosts(String email){
        ResponseObject responseObj = new ResponseObject();
        responseObj.setStatus("success");
        responseObj.setMessage("success");
        responseObj.setPayload(repo.findAllByUserId(email));
        return responseObj;
    }


    public ResponseObject updatePostByComment(PostModel inputPost) {
        ResponseObject responseObj = new ResponseObject();
        Optional<PostModel> optPost = repo.findById(inputPost.getId());
        if (optPost.isEmpty()) {
            responseObj.setStatus("fail");
            responseObj.setMessage("cannot find post id: " + inputPost.getId());
            responseObj.setPayload(null);
            return responseObj;
        } else {
            // inputPost.setCreatedAt(Instant.now());
            repo.save(inputPost);
            responseObj.setStatus("success");
            responseObj.setMessage("post is updated successfully");
            responseObj.setPayload(inputPost);
            return responseObj;
        }
    }
}
