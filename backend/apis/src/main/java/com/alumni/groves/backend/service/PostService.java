package com.alumni.groves.backend.service;


import com.alumni.groves.backend.models.PostModel;
import com.alumni.groves.backend.models.ResponseObject;
import com.alumni.groves.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;

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
}
