import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  posts_list: any;

  constructor(private http: HttpClient) {
    this.http.get<any>('http://localhost:3000/posts').subscribe(data => {this.posts_list = data;});
  }

  get_posts() { return this.http.get<any>('http://localhost:3000/posts')}
  del_post(postId: any) { return this.http.delete<any>(`http://localhost:3000/posts/${postId}`, postId);}
  update_post(postId: any) {return this.http.put<any>(`http://localhost:3000/posts/${postId}`, 'test_object_content__________________________')}
  create_post(postId: any){return this.http.post<any>('http://localhost:3000/posts', postId);}

}
