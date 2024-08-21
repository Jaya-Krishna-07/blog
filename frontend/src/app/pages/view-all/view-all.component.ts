import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatGridList } from '@angular/material/grid-list';
import { MatGridTile } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IncomingPost } from '../../models/incoming-post.model';

@Component({
  selector: 'app-view-all',
  standalone: true,
  imports: [MatCardModule, MatGridList, MatGridTile, MatButtonModule, MatIcon, DatePipe, RouterLink],
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css'
})
export class ViewAllComponent {

  allPosts: IncomingPost[] = [];

  constructor(private postService: PostService, private snackBar: MatSnackBar){this.getAllPosts();}


  getAllPosts(){
    this.postService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.allPosts = res;
      },
      error: (error) => {
        this.snackBar.open('There was an error getting all the posts', 'Error', {duration: 3000});
        console.log(error);
      }
    })
  }
}
