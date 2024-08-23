package com.blog.backend.controller;

import com.blog.backend.entity.Post;
import com.blog.backend.service.PostService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
public class PostController {
    @Autowired
    private PostService postService;


    @PostMapping("/createPost")
    public ResponseEntity<?> createPost(@Valid @RequestBody Post post){
        try {
            Post createdPost = postService.savePost(post);
            log.info("created post");
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping()
    public ResponseEntity<List<Post>> getAllPosts(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(postService.getAllPosts());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getPostById(@PathVariable Long postId){
        try {
            Post post = postService.getPostById(postId);
            return ResponseEntity.ok(post);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/like/{postId}")
    public ResponseEntity<?> likePost(@PathVariable Long postId){
        Map<String, String> responseString = new  HashMap<>();

        try {
            postService.likePost(postId);
            responseString.put("message", "Post Liked Successfully");
            return ResponseEntity.ok(responseString);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/search/{query}")
    public ResponseEntity<?> searchByName(@PathVariable String query){
        try {
            return ResponseEntity.ok(postService.searchByName(query));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException e){
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fileName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fileName, errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
