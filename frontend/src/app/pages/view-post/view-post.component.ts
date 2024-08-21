import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgFor } from '@angular/common';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { IncomingPost } from '../../models/incoming-post.model';



@Component({
  selector: 'app-view-post',
  standalone: true,
  imports: [
    MatCard, MatCardHeader, MatCardAvatar, MatCardTitle, MatCardSubtitle, MatCardImage, MatCardContent,
    MatChipSet, MatChip, MatCardActions, MatButtonModule, MatIcon, NgFor, DatePipe, ReactiveFormsModule, MatFormField,
    MatLabel, MatInput
  ],
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'] // Corrected styleUrl to styleUrls
})
export class ViewPostComponent {
  postId!: number;
  postData!: IncomingPost; // Changed to IncomingPost
  comments!: any; // This can remain as any or be strongly typed if a Comment interface is defined

  commentForm!: FormGroup;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.postId = +params['id'];
    });
    console.log(`in view-post.component.ts, initiating postId: ${this.postId}`);
    this.getPostById();

    this.commentForm = this.fb.group({
      postedBy: [null, Validators.required],
      content: [null, Validators.required]
    });
  }

  getCommentsByPostId() {
    this.commentService.getCommentsByPost(this.postId).subscribe({
      next: (res) => {
        this.comments = res;
      },
      error: (error) => {
        this.snackBar.open('Something went wrong');
        console.log(error);
      }
    });
  }

  getPostById() {
    this.postService.getPostById(this.postId).subscribe({
      next: (res: IncomingPost) => { // Specify the type of res as IncomingPost
        this.postData = res;
        console.log(this.postData);
        this.getCommentsByPostId();
      },
      error: (error) => {
        this.snackBar.open('There was an error getting the post', 'Error', { duration: 3000 });
        console.log(error);
      }
    });
  }

  likePost() {
    this.postService.likePost(this.postId).subscribe({
      next: (res) => {
        this.postData.likeCount += 1;
        this.snackBar.open('Post liked successfully');
        console.log(res);
      },
      error: (error) => {
        this.snackBar.open('Something went wrong');
        console.log(error);
      }
    });
  }

  publicComment() {
    const postedBy = this.commentForm.get('postedBy')?.value;
    const content = this.commentForm.get('content')?.value;

    this.commentService.createComment(this.postId, postedBy, content).subscribe({
      next: (res) => {
        this.snackBar.open('Comment successfully published');
        this.getCommentsByPostId();
      },
      error: (error) => {
        this.snackBar.open('Something went wrong', 'Error');
        console.log(error);
      }
    });
  }
}
