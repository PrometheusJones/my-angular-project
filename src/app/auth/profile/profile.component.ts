import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/core/interfaces';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('editProfileForm') editProfileForm: NgForm;

  // currentUser: IUser;
  currentUser: IUser;


  public isInEditMode: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userService.getProfile$().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }

  enterEditMode(currentUser: IUser): void {
    this.isInEditMode = true;

    setTimeout(() => {
      this.editProfileForm.form.patchValue({
        email: this.currentUser.email,
        username: this.currentUser.username,
        tel: this.currentUser.tel
          ? this.currentUser.tel : '',
      });
    });
  }

  updateProfile(): void {
    // console.log(this.editProfileForm.value);
    this.userService.updateProfile$(this.editProfileForm.value).subscribe(() => {
      this.authService.authenticate().subscribe(user => {
        this.currentUser = user;
        this.router.navigate(['user/profile'])
      });
    });
    this.isInEditMode = false;
  }
}
