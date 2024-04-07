package com.alumni.groves.backend.controller;

import com.alumni.groves.backend.models.ResponseObject;
import com.alumni.groves.backend.models.UserModel;
import com.alumni.groves.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UserControllers {

    @Autowired
    private UserService userService;

    @PostMapping("/users/save")
    public ResponseEntity<ResponseObject> saveUser(@RequestBody UserModel inputUser) {
        return new ResponseEntity<ResponseObject>(userService.saveUser(inputUser), HttpStatus.OK);
    }
}
