package com.alumni.groves.backend.repository;

import com.alumni.groves.backend.models.CommentModel;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends MongoRepository<CommentModel, String> {
    
}