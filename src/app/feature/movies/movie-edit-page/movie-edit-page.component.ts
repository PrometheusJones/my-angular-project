import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import { AuthService } from 'src/app/auth.service';
import { IMovie } from 'src/app/core/interfaces/movie';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { MovieService, CreateMovieDto } from 'src/app/core/movie.service';

@Component({
  selector: 'app-movie-edit-page',
  templateUrl: './movie-edit-page.component.html',
  styleUrls: ['./movie-edit-page.component.css']
})
export class MovieEditPageComponent implements OnInit, AfterViewInit {

  movie: IMovie;

  @ViewChild('editMovieForm') editMovieForm: NgForm;


  constructor(
    private router: Router,
    private authService: AuthService,
    private movieService: MovieService,
    private messageBus: MessageBusService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {




  }

  ngAfterViewInit(): void {
    const movieId = this.activatedRoute.snapshot.params['movieId'];

    this.movieService.loadMovieById(movieId).subscribe((movie: IMovie) => {
      this.editMovieForm.form.patchValue({
        movieName: movie.movieName,
        movieDescription: movie.movieDescription,
        imgUrl: movie.imgUrl,
        director: movie.director,
        duration: movie.duration,
        releseDate: this.datePipe.transform(movie.releseDate, 'yyyy-MM-dd'),
        genre: movie.genre,
      })
    });




  }

  editMovie(newMovieForm: NgForm, movie: IMovie): void {
    // console.log(newMovieForm.value);

    const formData = newMovieForm.value;
    const movieId = this.activatedRoute.snapshot.params['movieId'];



    this.authService.currentUser$.subscribe(user => {

      const newMovie: CreateMovieDto = {
        movieName: formData.movieName,
        movieDescription: formData.movieDescription,
        director: formData.director,
        duration: formData.duration,
        genre: formData.genre,
        releseDate: formData.releseDate,
        imgUrl: formData.imgUrl,
      }


      this.movieService.editMovie$(newMovie, movieId).subscribe({
        next: (newMovie) => {
          this.messageBus.notifyForMessage({ text: 'Movie edited!', type: MessageType.Success });
          this.router.navigate([`/movies/${movieId}`]);

        },
        error: (err) => {
          this.messageBus.notifyForMessage({ text: err, type: MessageType.Error });
        }
      });

    });

  }

  navigateToMovie(): void {
    const movieId = this.activatedRoute.snapshot.params['movieId'];

    this.router.navigate([`/movies/${movieId}`]);
  }


}
