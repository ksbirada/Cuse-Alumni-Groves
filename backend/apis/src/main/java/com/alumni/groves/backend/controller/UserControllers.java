package com.alumni.groves.backend.controller;

import com.alumni.groves.backend.models.AuthorizedModel;
import com.alumni.groves.backend.models.ResponseObject;
import com.alumni.groves.backend.models.UserModel;
import com.alumni.groves.backend.models.UserSignInModel;
import com.alumni.groves.backend.repository.UserRepository;
import com.alumni.groves.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class UserControllers {

    @Autowired
    private UserService userService;

//    /

    @Autowired
    private UserRepository userRepo;


    @PostMapping("/users/save")
    public ResponseEntity<ResponseObject> saveUser(@RequestBody UserModel inputUser) {
        return new ResponseEntity<>(userService.saveUser(inputUser), HttpStatus.OK);
    }

    @GetMapping("/get/{userId}")
    public ResponseEntity<ResponseObject> getUserDetailsById(@PathVariable String userId) {
        return new ResponseEntity<>(userService.getUserById(userId), HttpStatus.OK);
    }

        @PostMapping("/users/signin")
    public ResponseEntity<ResponseObject> userSignIn(@RequestBody UserSignInModel inputUser) {
        try {
            //authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(inputUser.getEmail(), inputUser.getPassword()));
            String token = "token";
            
            Optional<UserModel> optUser = userRepo.findByEmail(inputUser.getEmail());
            UserModel user = optUser.get();
            user.setPassword("");
            return new ResponseEntity<ResponseObject>(new ResponseObject("success", "authenticated", new AuthorizedModel(user, token)), HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<ResponseObject>(new ResponseObject("fail", "unauthenticated", null), HttpStatus.OK);
        }
    }
}
