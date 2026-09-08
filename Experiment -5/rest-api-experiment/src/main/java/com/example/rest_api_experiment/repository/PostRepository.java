package com.example.rest_api_experiment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.rest_api_experiment.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

}