import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMovie } from './interfaces/movie';

const apiUrl = environment.apiUrl;

export interface CreateMovieDto {
  movieName: string,
  duration: number,
  director: string,
  genre: string,
  movieDescription: string,
  releseDate: Date,
  imgUrl: string,
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  addMovie$(body: CreateMovieDto): Observable<IMovie> {
    return this.http.post<IMovie>(`${apiUrl}/movies`, body, { withCredentials: true });
  }

  editMovie$(body: CreateMovieDto, movieId: string): Observable<IMovie> {
    console.log(body);

    return this.http.patch<IMovie>(`${apiUrl}/movies/${movieId}`, { ...body }, { withCredentials: true });
  }
  deleteMovie$(movieId: string): any {

    return this.http.delete(`${apiUrl}/movies/${movieId}`, { withCredentials: true });
  }

  loadMovieList(searchTerm: string = ''): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${apiUrl}/movies?title=${searchTerm}`, {
      params: new HttpParams({
        fromObject: {
        }
      })
    });
  }

  addMovieComment(commentText: string, id: string) {
    return this.http.post(`${apiUrl}/movies/${id}`, { commentText }, { withCredentials: true })
  }

  loadMovieById(id: string): Observable<IMovie> {
    return this.http.get<IMovie>(`${apiUrl}/movies/${id}`);
  }

  subscribeMovie(id: string): Observable<IMovie> {
    return this.http.put<IMovie>(`${apiUrl}/movies/${id}/subscribe`, {}, { withCredentials: true });
  }

  unsubscribeMovie(id: string): Observable<IMovie> {
    return this.http.put<IMovie>(`${apiUrl}/movies/${id}/unsubscribe`, {}, { withCredentials: true });
  }


  // loadThemeById(id: string): Observable<IMovie<IPost>> {
  //   return this.http.get<IMovie<IPost>>(`${apiUrl}/themes/${id}`);
  // }

}
