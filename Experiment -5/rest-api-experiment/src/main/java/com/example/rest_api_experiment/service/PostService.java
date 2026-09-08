package com.example.rest_api_experiment.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.rest_api_experiment.dto.PostRequest;
import com.example.rest_api_experiment.entity.Post;
import com.example.rest_api_experiment.exception.ResourceNotFoundException;
import com.example.rest_api_experiment.repository.PostRepository;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post createPost(PostRequest request) {

        Post post = new Post();

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setAuthor(request.getAuthor());
        post.setScheduledAt(request.getScheduledAt());
        post.setStatus(request.getStatus());

        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {

        return postRepository.findAll();
    }

    public Post getPostById(Long id) {

        return postRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Post not found with id: " + id
                        )
                );
    }

    public Post updatePost(Long id, PostRequest request) {

        Post post = getPostById(id);

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setAuthor(request.getAuthor());
        post.setScheduledAt(request.getScheduledAt());
        post.setStatus(request.getStatus());

        return postRepository.save(post);
    }

    public void deletePost(Long id) {

        Post post = getPostById(id);

        postRepository.delete(post);
    }
}