import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  createNewPost(data:any){
    return this.http.post(BASIC_URL + "api/posts/createPost", data);
  }
}
