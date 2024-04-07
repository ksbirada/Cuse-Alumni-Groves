package com.alumni.groves.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Users")
public class UserModel {
    @Id
    private String id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String userType;
}
