import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private isLoggingOut: boolean = false;



  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logoutHandler(): void {
    if (this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;
    console.log('logout called');

    this.authService.logout$().subscribe({
      next: args => {
        console.log(args);
      },
      complete: () => {
        this.isLoggingOut = false;
        this.router.navigate(['/home']);
      },
      error: () => {
        this.isLoggingOut = false;
      }
    });
  }

}
