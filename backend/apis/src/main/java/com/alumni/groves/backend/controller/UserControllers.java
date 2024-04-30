package com.alumni.groves.backend.controller;

import com.alumni.groves.backend.models.*;
import com.alumni.groves.backend.repository.UserRepository;
import com.alumni.groves.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class UserControllers {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepo;


    @PostMapping("/users/save")
    public ResponseEntity<ResponseObject> saveUser(@RequestBody UserModel inputUser) {
        return new ResponseEntity<>(userService.saveUser(inputUser), HttpStatus.OK);
    }

    @GetMapping("/get/{userId}")
    public ResponseEntity<ResponseObject> getUserDetailsById(@PathVariable String userId) {
        return new ResponseEntity<>(userService.findById(userId), HttpStatus.OK);
    }

    @PostMapping("/users/signin")
    public ResponseEntity<ResponseObject> userSignIn(@RequestBody UserSignInModel inputUser) {
    try {
        
        Optional<UserModel> optUser = userRepo.findByEmail(inputUser.getEmail());
        System.out.println(optUser.toString()+" userValue");
        if (optUser.isPresent()) {
            UserModel user = optUser.get();

            if(passwordEncoder.matches(inputUser.getPassword(), user.getPassword())){
                user.setPassword("");
                return new ResponseEntity<>(new ResponseObject("success", "authenticated", user), HttpStatus.OK);
            }else{
                return new ResponseEntity<ResponseObject>(new ResponseObject("fail", "unauthenticated", null), HttpStatus.OK);
            }

           
        } else {
           return new ResponseEntity<>(new ResponseObject("fail", "user not found", null), HttpStatus.NOT_FOUND);
        }
    } catch (Exception ex) {
        System.out.println("Exception occurred during sign in: " + ex.getMessage());
        return new ResponseEntity<>(new ResponseObject("fail", "internal server error", null), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    @PostMapping("/users/update")
    public ResponseEntity<ResponseObject> updateUserProfile(@RequestBody UserEditProfileModel userEditProfileModel) {

        ResponseObject response;
        ResponseObject response1;
        ResponseObject response2;
        if(!userEditProfileModel.getUsername().isEmpty()){
            response = userService.updateDetails(userEditProfileModel.getCurrentUsername(), userEditProfileModel.getUsername());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else if(!userEditProfileModel.getPassword().isEmpty()){
            response = userService.updateDetails(userEditProfileModel.getCurrentUsername(), passwordEncoder.encode(userEditProfileModel.getPassword()));
            return new ResponseEntity<>(response, HttpStatus.OK);
        }else {
            response1 = userService.updateDetails(userEditProfileModel.getCurrentUsername(), userEditProfileModel.getUsername());
            response2 = userService.updateDetails(userEditProfileModel.getCurrentUsername(), passwordEncoder.encode(userEditProfileModel.getPassword()));
            if (response1.getStatus().equals("success") && response2.getStatus().equals("success")) {
                response1.setMessage("Both fields updated successfully");
                return new ResponseEntity<>(response1, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(new ResponseObject("Failure", "failure", "No case matched data not updated"), HttpStatus.OK);
    }


    @PostMapping("/users")
    public ResponseEntity<ResponseObject> findAllUsers() {
        return new ResponseEntity<ResponseObject>(userService.findAll(), HttpStatus.OK);
    }

}
