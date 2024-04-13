package com.alumni.groves.backend.controller;

import com.alumni.groves.backend.models.PostModel;
import com.alumni.groves.backend.models.ResponseObject;
import com.alumni.groves.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/insertpost")
    public ResponseEntity<ResponseObject> insertPost(@RequestBody PostModel inputPost){
        return new ResponseEntity<ResponseObject>(postService.insertPost(inputPost), HttpStatus.OK);
    }

    @GetMapping("/getpost")
    public ResponseEntity<ResponseObject> getAllPosts(){
        return new ResponseEntity<ResponseObject>(postService.getAllPosts(), HttpStatus.OK);
    }
}
