import { Component, OnInit, DoCheck } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postspage',
  templateUrl: './postspage.component.html',
  styleUrls: ['./postspage.component.css']
})
export class PostspageComponent implements DoCheck {
  posts_list: any;
  userId: any = this.auth.userId;
  admin: any = this.auth.admin;

  users: any;

  limit: any;
  page: any;
  page_count: any;

  constructor(private posts: PostsService,
	     private auth: AuthService,
	     private param: ActivatedRoute,
	     private router: Router) {}

  ngDoCheck(): void {
    //this.posts_list = this.posts.posts_list;
    this.userId = this.auth.userId;
    this.admin = localStorage.getItem('admin');

  }

  ngOnInit() {
    this.posts.get_posts().subscribe((p: any) => {
	    this.posts_list = p;
	    this.page_count = this.posts_list.length / this.limit;
	    this.page_count = Math.ceil(this.page_count);
    });

    this.param.queryParams.subscribe(
      (params: any) => {if(params.limit !== undefined && params.page !== undefined) {this.limit = params.limit; this.page = params.page;} else {this.limit = 10;this.page = 1}});

  }

  del_post(postId: any) {
    let a = this.posts.del_post(postId);
    a.subscribe(() => location.reload());
  }

  edit(postNum: any) {this.router.navigateByUrl(`/create/${postNum}`)}

  getUser(userId: any) {
  return this.auth.getUser(userId);
  }

  getUserName(userId: any){this.getUser(userId).subscribe(d => {return d[0].firstName})}


}
