import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { rePasswordMatch } from '../utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(null, [Validators.required, Validators.minLength(5)]),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'passwords': new FormGroup({
      'password': this.passwordControl,
      'rePassword': new FormControl(null, [rePasswordMatch(this.passwordControl)]),
    })
  })



  constructor(private formBuilder: FormBuilder) { }



  ngOnInit(): void {
  }


  handleRegister(): void {
    const { username, email, passwords, tel, telRegion } = this.registerFormGroup.value;

    // const body: CreateUserDto = {
    //   username: username,
    //   email: email,
    //   password: passwords.password,
    // }


    console.log(this.registerFormGroup.value);


  }


}
