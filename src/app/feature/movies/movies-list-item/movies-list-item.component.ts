import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/core/interfaces';
import { IMovie } from 'src/app/core/interfaces/movie';

@Component({
  selector: 'app-movies-list-item',
  templateUrl: './movies-list-item.component.html',
  styleUrls: ['./movies-list-item.component.css']
})
export class MoviesListItemComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  currentUser: IUser | undefined;

  @Input() movie: IMovie;

  constructor(
    private authService: AuthService,
    private routre: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => this.currentUser = user)
  }

 

  // canLike(comment: IMovie) {
  //   return !comment.posts.includes(this.currentUser!._id);
  // }

}
