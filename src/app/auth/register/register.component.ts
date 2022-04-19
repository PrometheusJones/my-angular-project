import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordControl = new FormControl();

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    'username': new FormControl(),
    'email': new FormControl(),
    'passwords': new FormControl({
      'password': this.passwordControl,
      'rePassword': new FormControl(),
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
