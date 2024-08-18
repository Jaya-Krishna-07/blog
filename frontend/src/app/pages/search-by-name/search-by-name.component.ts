import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-by-name',
  standalone: true,
  imports: [MatFormField, MatLabel, MatInput, MatButton, MatSuffix, MatIcon, MatCardTitle, MatCardSubtitle, DatePipe,
             MatCardActions, MatGridList, MatCardContent, MatGridTile, MatCard, MatCardHeader, FormsModule, RouterLink],
  templateUrl: './search-by-name.component.html',
  styleUrl: './search-by-name.component.css'
})
export class SearchByNameComponent {

  result: any = [];
  name: string = "";

  constructor(private postService: PostService, private snackBar: MatSnackBar){}

  searchByName(){
    this.postService.searchByName(this.name).subscribe({
      next: (res) => {
        this.result = res;
        console.log(res);
      },
      error: (error) => {
        this.snackBar.open('something went wrong', 'error');
        console.log(error)
      }
    });
  }

}
