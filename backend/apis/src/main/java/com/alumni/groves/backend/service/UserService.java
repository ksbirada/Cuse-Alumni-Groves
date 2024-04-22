package com.alumni.groves.backend.service;

import com.alumni.groves.backend.models.ResponseObject;
import com.alumni.groves.backend.models.UserModel;
import com.alumni.groves.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements UserDetailsService{

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ResponseObject saveUser(UserModel inputUser) {
        ResponseObject responseObj = new ResponseObject();
        Optional<UserModel> optUser = userRepo.findByEmail(inputUser.getEmail());
        if (optUser.isPresent()) {
            responseObj.setStatus("fail");
            responseObj.setMessage("Email address " + inputUser.getEmail() + "already exists");
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

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserModel> optUser = userRepo.findByEmail(email);
        User springUser = null;

        if (optUser.isEmpty()) {
            throw new UsernameNotFoundException("Cannot find user with email: " + email);
        } else {
            UserModel foundUser = optUser.get();
            Set<GrantedAuthority> ga = new HashSet<>();
            springUser = new User(foundUser.getEmail(), foundUser.getPassword(), ga);
            return springUser;
        }
    }


    public ResponseObject updateDetails(String currentUsername, String newUsername) {
        ResponseObject responseObj = new ResponseObject();
        Optional<UserModel> optUser = userRepo.findByEmail(currentUsername);

        if (optUser.isEmpty()) {
            responseObj.setStatus("fail");
            responseObj.setMessage("User with email " + currentUsername + " not found");
            return responseObj;
        }

        UserModel user = optUser.get();
        user.setEmail(newUsername);
        userRepo.save(user);

        responseObj.setStatus("success");
        responseObj.setMessage("Username updated successfully");
        responseObj.setPayload(user);
        return responseObj;
    }

    public ResponseObject updateDetails(String currentUsername, PasswordEncoder password) {
        ResponseObject responseObj = new ResponseObject();
        Optional<UserModel> optUser = userRepo.findByEmail(currentUsername);

        if (optUser.isEmpty()) {
            responseObj.setStatus("fail");
            responseObj.setMessage("User with email " + currentUsername + " not found");
            return responseObj;
        }

        UserModel user = optUser.get();
        user.setPassword(password.toString());
        userRepo.save(user);

        responseObj.setStatus("success");
        responseObj.setMessage("Password updated successfully");
        responseObj.setPayload(user);
        return responseObj;
    }
}


