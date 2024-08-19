# Blog Project

This is a full-stack blog application built with Spring Boot for the backend, Angular for the frontend, and MySQL as the database.

## Technologies Used

- **Backend:** Spring Boot
    - Spring Starter Web
    - Spring Data JPA
    - MySQL Driver
    - Lombok
- **Frontend:** Angular
    - Angular Material
- **Database:** MySQL

## Project Structure

### Backend

The backend of this project is developed using Spring Boot, with the following main components:

- **Controllers:**
    - `PostController`: Handles requests related to blog posts.
    - `CommentController`: Manages requests related to comments on posts.
- **Service:**
    - `PostService`
    - `CommentService`
- **Repositories:**
    - `PostRepository`: Implements the JPARepository interface, uses the Post entity.
    - 'CommentRepository': Implements the JPARepository interface, uses the Comment entity.

### Frontend

The frontend is developed using Angular and Angular Material, providing a responsive and interactive user interface for the blog application.

## Endpoints

### Posts

- **Base URL:** `http://localhost:306/api/posts`
- **Available Endpoints:**
    - `GET /`: Retrieve all posts.
    - `GET /{postId}`: Retrieve a specific post by ID.
    - `POST /createPost`: Create a new post.
    - `PUT /like/{postId}`: Like a specific post by ID.
    - `GET /search/{query}`: Search for posts based on a query.

### Comments

- **Base URL:** `http://localhost:306/api/comments`
- **Available Endpoints:**
    - `POST /create-comment`: Create comment for a specific post.
    - `GET /api/comments/{postId}`: Retrieve comments for a specific post.

## Features

- **Create Post:** Users can create a new blog post using the provided form.
- **View Posts:** Users can view all existing blog posts.
- **Like Post:** Users can like a post to show appreciation.
- **Search Posts:** Users can search for specific posts using a query.
- **Comment on Posts:** Users can add comments to posts and view existing comments.
- **Views and Likes:** Users can see the likes and views a post received.

## Getting Started

### Prerequisites

- Java 17 or later
- An IDE like IntelliJ to run spring boot projects
- Node.js and Angular CLI
- MySQL database

### Setting Up the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/Jaya-Krishna-07/blog.git

