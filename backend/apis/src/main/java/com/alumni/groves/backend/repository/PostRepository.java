package com.alumni.groves.backend.repository;


import com.alumni.groves.backend.models.PostModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<PostModel, String> {

    List<PostModel> findAllByUserId(String email);
}
