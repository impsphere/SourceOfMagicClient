import { Component } from '@angular/core';
import { Login } from '../../Models/login';
import { Register } from '../../Models/register';
import { jwtAuth } from '../../Models/jwtAuth';
import { AuthenticationService } from '../../services/authentication.service';
import { Validators, ValidationErrors, ValidatorFn } from "@angular/forms";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';


@Component({
  selector: 'login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent {

  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new jwtAuth;


  public _RegistrationComplete : boolean = false;
  public _RegistrationFailedEmail : boolean = false;
  public _RegistrationFailedUser : boolean = false;

  get RegistrationComplete(): boolean {
    return this._RegistrationComplete;
  }

  get RegistrationFailedEmail(): boolean {
    return this._RegistrationFailedEmail;
  }

  get RegistrationFailedUser(): boolean {
    return this._RegistrationFailedUser;
  }

  constructor(private authService: AuthenticationService,
    private _router: Router){}

  Register(registerDto: Register) {
    this._RegistrationFailedEmail = false;
    this._RegistrationFailedUser = false;
    this._RegistrationComplete = false;
    this.authService.register(registerDto).subscribe( {
      next: value => 
      {
        this._RegistrationComplete = true;
        this.signUpForm.reset();
        this.signUpForm.markAsPristine();
        this.signUpForm.markAsUntouched();
        this.signUpForm.setErrors(null);
      },
      error: err => 
      {
        if (new String(err).indexOf("Email already exists") >= 0)
        {this._RegistrationFailedEmail = true;}
        else
        {this._RegistrationFailedUser = true;}
        console.log("This is an error:", err)
      }
    });
    // Give the user a success message and clear out the DTO objeect so the screen clears
    
    //if ((this._RegistrationFailedEmail === false) && (this._RegistrationFailedUser === false))
    //{
    //  this._RegistrationComplete = true;
    //  this.signUpForm.reset();
    //}
  }

  Login(loginDto: Login) {
    this.authService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('jwtToken', jwtDto.token);
    });
    this._router.navigate(['home'])
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