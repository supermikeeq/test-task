import { Component, OnInit, DoCheck } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements DoCheck {

  post_number: any = 0;
  posts_list: any;
  smallText: any;
  largeText: any;
  author: any;
  changed: any;
  users: any;
  
  post: any;
  a: any;
  b: any;

  isAdmin: any = localStorage.getItem('admin');

  constructor(private posts: PostsService,
	     private auth: AuthService,
	     private route: ActivatedRoute) {}

  ngOnInit() {
  this.getUsers();
  this.post_number = this.route.snapshot.paramMap.get('num');
  }

  getUsers() {
    this.auth.getUsers().subscribe(data => {this.users = data;});
  }

  ngDoCheck(): void {
    this.posts_list = this.posts.posts_list;
    this.b = this.posts_list.find((d: any) => {if (d.id == this.post_number) {return d;}});
    this.smallText = this.b.smallText;
    this.largeText = this.b.largeText;
    if (this.b.updatedAt) { this.changed = this.b.updatedAt;} else {this.changed = this.b.createdAt;}
    this.isAdmin = localStorage.getItem('admin');

  }

  del_post(postId: any) {
    let a = this.posts.del_post(postId);
    a.subscribe(() => location.reload());
  }
}
