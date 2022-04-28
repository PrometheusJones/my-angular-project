import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { MovieService } from 'src/app/core/movie.service';
import { CreateMovieDto } from 'src/app/core/movie.service'

@Component({
  selector: 'app-movies-new-page',
  templateUrl: './movies-new-page.component.html',
  styleUrls: ['./movies-new-page.component.css']
})
export class MoviesNewPageComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private movieService: MovieService,
    private messageBus: MessageBusService
  ) { }

  ngOnInit(): void {
  }

  submitNewMovie(newMovieForm: NgForm): void {
    // console.log(newMovieForm.value);

    const formData = newMovieForm.value;



    this.authService.currentUser$.subscribe(user => {

      const newMovie: CreateMovieDto = {
        movieName: formData.movieName,
        movieDescription: formData.movieDescription,
        director: formData.director,
        duration: formData.duration,
        genre: formData.genre,
      }


      this.movieService.addMovie$(newMovie).subscribe({
        next: (newMovie) => {
          console.log(newMovie);
          this.messageBus.notifyForMessage({ text: 'Movie is added!', type: MessageType.Success });
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          console.error(err);
          this.messageBus.notifyForMessage({ text: err, type: MessageType.Error });
        }
      });

    });

  }

  navigateToMovies(): void {
    this.router.navigate(['/movies']);
  }

}
