import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostspageComponent } from './postspage/postspage.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CreateComponent } from './create/create.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostComponent } from './post/post.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full' },
  {path: 'posts', component: PostspageComponent},
  {path: 'post/:num', component: PostComponent},
  {path: 'create/:num', component: CreateComponent},
  {path: 'main', component: PostspageComponent},
  {path: 'sign-in', component: LogInComponent, canActivate: [AuthService] },
  {path: 'sign-up', component: SignUpComponent, canActivate: [AuthService] },
  {path: 'create', component: CreateComponent },
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
