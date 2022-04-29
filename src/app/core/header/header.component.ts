import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from '../interfaces';
import { MessageBusService, MessageType } from '../message-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  currentUser$: Observable<IUser | undefined> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  message: string = '';
  isErrorMessage: boolean = false;


  private isLoggingOut: boolean = false;

  private subscription: Subscription | undefined = undefined;


  constructor(private authService: AuthService, private router: Router, private messageBus: MessageBusService) { }

  ngOnInit(): void {
    this.subscription = this.messageBus.onNewMessage$.subscribe(newMessage => {
      this.message = newMessage?.text || '';
      this.isErrorMessage = newMessage?.type === MessageType.Error

      if (this.message) {
        setTimeout(() => {
          this.messageBus.clear();
        }, 3000);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  logoutHandler(): void {
    if (this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;

    this.authService.logout$().subscribe({
      next: args => {
        console.log(args);
      },
      complete: () => {
        this.isLoggingOut = false;
        this.messageBus.notifyForMessage({ text: 'You have loggeout!', type: MessageType.Success });
        this.router.navigate(['/home'])
        this.authService.handleLogout()
      },
      error: (err) => {
        this.isLoggingOut = false;
        this.messageBus.notifyForMessage({ text: err.error.message, type: MessageType.Error })
        console.log(err);

      }
    });
  }

}
