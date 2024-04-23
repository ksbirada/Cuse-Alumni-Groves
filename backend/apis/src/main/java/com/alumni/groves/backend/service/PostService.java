package com.alumni.groves.backend.service;


import com.alumni.groves.backend.models.LikeModel;
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

    public ResponseObject updatePostByLike(LikeModel doubleId) {
        // id 1 - post Id, id 2 - user who liked post
        ResponseObject responseObj = new ResponseObject();
        Optional<PostModel> optPost = repo.findById(doubleId.getId1());
        if (optPost.isEmpty()) {
            responseObj.setStatus("fail");
            responseObj.setMessage("cannot find post id: " + doubleId.getId1());
            responseObj.setPayload(null);
            return responseObj;
        } else {
            PostModel targetPost = optPost.get();
            List<String> likeList = targetPost.getLike();
            if (likeList == null) {
                likeList = new ArrayList<>();
            }

            if (!likeList.contains(doubleId.getId2())) {
                likeList.add(doubleId.getId2());
            } else {
                likeList.remove(doubleId.getId2());
            }
            targetPost.setLike(likeList);
            repo.save(targetPost);
            responseObj.setStatus("success");
            responseObj.setMessage("update like to the target post id: " + targetPost.getId());
            responseObj.setPayload(targetPost);
            return responseObj;
        }
    }
}
