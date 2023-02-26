import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { DoCheck } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements DoCheck {

  user: any;
  password: any;
  isUserNotExisted: any;
  testUser: any;
  isNotLogged: any;

  constructor(private auth: AuthService) { }

  ngDoCheck() {
    if (localStorage.getItem('isLogged') === 'false') {
      this.isNotLogged = true; }
  }


  onClickSubmit(userName: any, password: any) {
    this.auth.getUser(userName).subscribe((d) => {
      this.testUser = d;
      if (d.length == 1 && (d[0].firstName == userName)) {
	      if (d[0].password == password) {
	this.isUserNotExisted = false;
        this.auth.logIn(this.testUser);
	this.isNotLogged = false;}
      }
      else {this.isUserNotExisted = true;}
    })
  }



}
