package com.alumni.groves.backend.service;

import com.alumni.groves.backend.models.ResponseObject;
import com.alumni.groves.backend.models.UserModel;
import com.alumni.groves.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseObject saveUser(UserModel inputUser) {
        ResponseObject responseObj = new ResponseObject();
        Optional<UserModel> optUser = userRepo.findByEmail(inputUser.getEmail());
        if (optUser.isPresent()) {
            responseObj.setStatus("fail");
            responseObj.setMessage("Email address " + inputUser.getEmail() + " existed");
            responseObj.setPayload(null);
            return responseObj;
        } else {
            inputUser.setPassword(passwordEncoder.encode(inputUser.getPassword()));

            // user follows himself so he could get his posts in newsfeed as well
            UserModel user = userRepo.save(inputUser);
            this.addUser(user);
            responseObj.setPayload(user);
            responseObj.setStatus("success");
            responseObj.setMessage("success");
            return responseObj;
        }
    }

    public boolean addUser(UserModel inputUser) {
        Optional<UserModel> optUser = userRepo.findById(inputUser.getId());
        if (optUser.isEmpty()) {
            return false;
        } else {
            UserModel currentUser = optUser.get();
            if (inputUser.getPassword().equals(currentUser.getPassword())) {
                userRepo.save(inputUser);
                return true;
            } else {
                return false;
            }
        }
    }
}


