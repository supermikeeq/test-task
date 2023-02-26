import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userName: any;
  isLogged: any;
  canEdit: any;
  admin: any;
  isUserNotExisted: any = false;
  user: any = '';
  userId: any = localStorage.getItem('userId');

  testUserName: any = undefined;

  constructor(private http: HttpClient) { }

  signUp(firstName: any, lastName: any, email: any, role: any, password: any) {
    return this.http.post<any>("http://localhost:3000/users", {"firstName": `${firstName}`, "lastName": `${lastName}`, "email": `${email}`, "role": `${role}`, "password": `${password}`});
  }
  
  getUsers() {
    return this.http.get<any>('http://localhost:3000/users');
  }

  logOut() {
    this.userName = "unknown_fromAuth";
    this.isLogged = false;
    this.canEdit = false;
    this.admin = false;
    this.userId = '';
    this.isUserNotExisted = true;
    localStorage.setItem('userName', 'unknown_fromAuth');
    localStorage.setItem('isLogged', 'false');
    localStorage.setItem('canEdit', 'false');
    localStorage.setItem('admin', 'false');
    localStorage.setItem('userId', '');
  }

  getUser(userId: any) {
    return this.http
    .get<any>(`http://localhost:3000/users?q=${userId}`)
  }

  logIn(userObj: any) {
    this.userName = userObj[0].firstName;
    this.isLogged = true;
    this.canEdit = true;
    if (userObj[0].role == 'writer') { this.admin = true;} else {this.admin = false;}
    this.isUserNotExisted = true;
    this.userId = userObj[0].id;
    localStorage.setItem('userName', userObj[0].firstName);
    localStorage.setItem('userId', userObj[0].id);
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('admin', 'true');
    localStorage.setItem('canEdit', 'true');
    if(userObj[0].role == "writer") {localStorage.setItem('admin', 'true');} else {localStorage.setItem('admin', 'false');}
  }

  canActivate() {
    if (localStorage.getItem('isLogged') === 'true') {return false;}
    else return true;
  }

}
