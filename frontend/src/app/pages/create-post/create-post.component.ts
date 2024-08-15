import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatChipGrid, MatChipInputEvent } from '@angular/material/chips';
import { MatChipRow } from '@angular/material/chips';
import { MatChipRemove } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatChipInput } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostService } from '../../services/post.service';
@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [MatChipsModule, MatChipGrid, MatChipRow, MatChipRemove, MatChipInput,
            MatFormFieldModule, MatCardModule,
            ReactiveFormsModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

  postForm: FormGroup;
  tags: string[] = [];

  constructor(private fb: FormBuilder, private router: Router,
              private snackBar: MatSnackBar, private postService: PostService
  ) {
    this.postForm = this.fb.group({ 
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null, Validators.required],
      postedBy: [null, Validators.required]
    });
    console.log("CreatePostComponent loaded");
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add the tag if the input is not empty
    if (value) {
      this.tags.push(value);
    }

    // Clear the input field
    event.chipInput!.clear();
  }


  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    // Remove the tag if it exists in the array
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  // createPost(){
  //   const data = this.postForm.value;
  //   data.tags = this.tags;

  //   this.postService.createNewPost(data).subscribe(res => {
  //     this.snackBar.open("Post created successfully", "ok");
  //     this.router.navigateByUrl("/");
  //   }, error => {
  //     this.snackBar.open("something went wrong", "ok");
  //   })
  // }
  createPost() {
    if (this.postForm.invalid) {
      this.snackBar.open('Please fill in all required fields.', 'Error', {
        duration: 3000
      });
      return;
    }
  
    const data = { ...this.postForm.value, tags: this.tags }; // Spread operator for cleaner data object creation
  
    this.postService.createNewPost(data)
      .subscribe({
        next: (res) => {
          this.snackBar.open('Post created successfully!', 'Success', {
            duration: 3000
          });
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          this.snackBar.open('There was an error creating the post.', 'Error', {
            duration: 3000
          });
          console.error(error); // Log the error for debugging
        }
      });
  }


}
