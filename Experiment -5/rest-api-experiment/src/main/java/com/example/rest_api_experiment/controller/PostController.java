package com.example.rest_api_experiment.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rest_api_experiment.dto.PostRequest;
import com.example.rest_api_experiment.entity.Post;
import com.example.rest_api_experiment.response.ApiResponse;
import com.example.rest_api_experiment.service.PostService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(
        origins = {
                "http://localhost:3000",
                "http://localhost:5500",
                "http://127.0.0.1:5500"
        }
)
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<ApiResponse<Post>> createPost(
            @Valid @RequestBody PostRequest request) {

        Post post = postService.createPost(request);

        ApiResponse<Post> response =
                new ApiResponse<>(
                        true,
                        "Post created successfully",
                        post
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<ApiResponse<List<Post>>> getAllPosts() {

        List<Post> posts = postService.getAllPosts();

        ApiResponse<List<Post>> response =
                new ApiResponse<>(
                        true,
                        "Posts retrieved successfully",
                        posts
                );

        return ResponseEntity.ok(response);
    }

    // READ ONE
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Post>> getPostById(
            @PathVariable Long id) {

        Post post = postService.getPostById(id);

        ApiResponse<Post> response =
                new ApiResponse<>(
                        true,
                        "Post retrieved successfully",
                        post
                );

        return ResponseEntity.ok(response);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Post>> updatePost(
            @PathVariable Long id,
            @Valid @RequestBody PostRequest request) {

        Post post = postService.updatePost(id, request);

        ApiResponse<Post> response =
                new ApiResponse<>(
                        true,
                        "Post updated successfully",
                        post
                );

        return ResponseEntity.ok(response);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deletePost(
            @PathVariable Long id) {

        postService.deletePost(id);

        ApiResponse<Object> response =
                new ApiResponse<>(
                        true,
                        "Post deleted successfully",
                        null
                );

        return ResponseEntity.ok(response);
    }
}