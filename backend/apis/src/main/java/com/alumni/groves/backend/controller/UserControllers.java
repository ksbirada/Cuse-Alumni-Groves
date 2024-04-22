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

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class UserControllers {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepo;


    @PostMapping("/users/save")
    public ResponseEntity<ResponseObject> saveUser(@RequestBody UserModel inputUser) {
        return new ResponseEntity<ResponseObject>(userService.saveUser(inputUser), HttpStatus.OK);
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

}
