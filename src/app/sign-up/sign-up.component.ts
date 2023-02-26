import { Component, DoCheck } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements DoCheck {
 
  firstName: any;
  lastName: any;
  email: any;
  role: any;
  password: any;
  passwordCheck: any;
  isNotLogged: any = true;
  
  first: any;
  submitActivated: any;
  passMatch: any;

  dataSent: any = false;

  ngDoCheck(){this.passMatch = false;if (this.password === this.passwordCheck && (this.password > 6)) {this.passMatch = true;} else {this.passMatch = false;}}

  onClickSubmit(firstName: any, lastName: any, email: any, role: any, password: any) {
	  this.auth.signUp(this.firstName, this.lastName, this.email, this.role, this.password).subscribe();
  	  this.dataSent = true;
  }

  constructor(private auth: AuthService) { }

}
