import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  post: any;
  postNum: any;
  post_small: any;
  post_large: any;
  userId: any = Number(localStorage.getItem('userId'));
  visible: any = true;
  a: any;
  b: any;
  c: any;
  currentDate: any = new Date().toISOString();

  createOrEdit: any;

  constructor(private route: ActivatedRoute,
	      private posts: PostsService) { }

  create_post(postId: any) {
    let a = this.posts.create_post(postId);
    a.subscribe();
    this.visible = false;
  }

  save_post(postId: any){}

  ngOnInit(): void {
    this.postNum = this.route.snapshot.paramMap.get('num');
    this.a = this.posts.get_posts();
    if(this.postNum) {this.a.subscribe((d:any) => {this.b = d;
                    this.c = this.b.find((z:any) => {if(z.id == this.postNum) {return z;}})
                    console.log(this.c);
                    this.post_small = this.c.smallText;
                    this.post_large = this.c.largeText;
    });}
    
   // this.a = this.posts.posts_list.find((d:any) => {if (d.id === this.postNum) {return d.id;}});
    this.visible = true;
  }

}
