import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IComment } from './interfaces/comment';

const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }


  loadCommentsList(movieId: string, limit?: number): Observable<IComment[]> {

    return this.http.get<IComment[]>(
      `${apiUrl}/comments/${movieId}${limit ? `?limit=${limit}` : ''}`
    );
  }


  commentLike(commentId: string): any {

    return this.http.put(
      `${apiUrl}/likes/${commentId}`, {}, { withCredentials: true }
    );
  }
  commentDislike(commentId: string): any {

    return this.http.delete<IComment[]>(
      `${apiUrl}/likes/${commentId}`, { withCredentials: true }
    );
  }
}

