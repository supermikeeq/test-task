import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'app';
  userName: any;
  isLogged: any = this.auth.isLogged;

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    localStorage.setItem('isLogged', 'false');
  }

  ngDoCheck() {
    this.userName = localStorage.getItem('userName');
    if (localStorage.getItem('isLogged') == 'true') {this.isLogged = true;}
      else {this.isLogged = false;}
  }
}
