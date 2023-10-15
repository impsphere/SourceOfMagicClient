import { Component } from '@angular/core';
import { Login } from '../../Models/login';
import { Register } from '../../Models/register';
import { jwtAuth } from '../../Models/jwtAuth';
import { AuthenticationService } from '../../services/authentication.service';
import { Validators } from "@angular/forms";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent {

  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new jwtAuth;

  constructor(private authService: AuthenticationService){}

  Register(registerDto: Register) {
    this.authService.register(registerDto).subscribe();
  }

  Login(loginDto: Login) {
    this.authService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('jwtToken', jwtDto.token);
    });
  }

  signUpForm = new FormGroup({
    Name: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ])
  })


}
