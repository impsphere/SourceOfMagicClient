import { Component } from '@angular/core';
import { Login } from '../../Models/login';
import { Register } from '../../Models/register';
import { jwtAuth } from '../../Models/jwtAuth';
import { AuthenticationService } from '../../services/authentication.service';
import { Validators, ValidationErrors, ValidatorFn } from "@angular/forms";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";

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

  onSubmit() {
    this.Register(this.registerDto);
  }

  signUpForm = new FormGroup({
    Name: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]),
    Email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    Password: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")
    ]),
    PasswordRepeated: new FormControl("", [
      Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")
    ])
  }, { validators: passwordMatchingValidator});


}


export const passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('Password');
  const confirmPassword = control.get('PasswordRepeated');

  return password?.value === confirmPassword?.value ? null : { notmatched: true };
};