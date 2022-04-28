import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/core/interfaces/movie';
import { MovieService } from 'src/app/core/movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  movieList: IMovie[];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.loadMovieList()
      .subscribe(movieList => {
        this.movieList = movieList;
      });

  }
}
