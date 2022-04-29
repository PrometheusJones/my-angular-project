import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/core/interfaces';
import { IMovie } from 'src/app/core/interfaces/movie';
import { MessageType } from 'src/app/core/message-bus.service';
import { MovieService } from 'src/app/core/movie.service';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.css']
})
export class MovieDetailPageComponent implements OnInit, OnChanges {

  movie: IMovie;

  canSubscribe: boolean = false;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  currentUser$: Observable<IUser | undefined> = this.authService.currentUser$;
  userId: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const movieId = this.activatedRoute.snapshot.params['movieId'];
    this.movieService.loadMovieById(movieId).subscribe(movie => {
      this.movie = movie;

      this.currentUser$.subscribe(user => {
        this.userId = user!._id;
        this.canSubscribe = !this.movie.subscribers.includes(this.userId);
      });
    });

  }


  ngOnChanges(): void {
    // TODO : use currentUser$!
    this.currentUser$.subscribe(user => {
      this.userId = user!._id;
    });
    this.canSubscribe = !this.movie.subscribers.includes(this.userId);
  }

  handleSubscribe(movie: IMovie): void {
    this.movieService.subscribeMovie(movie._id).subscribe(updatedMovie => {
      this.movie = { ...updatedMovie };
      this.canSubscribe = !this.canSubscribe;
    })
    this.router.navigate([`/movies/${this.movie._id}`])
  }

  handleUnsubscribe(movie: IMovie): void {
    this.movieService.unsubscribeMovie(movie._id).subscribe(updatedMovie => {
      this.movie = { ...updatedMovie };
      this.canSubscribe = !this.canSubscribe;
    })
    this.router.navigate([`/movies/${this.movie._id}`])
  }

  canLike(comment: string): string {
    return comment
  }

  handleSubscription() {
    this.canSubscribe = !this.canSubscribe;
  }

}
