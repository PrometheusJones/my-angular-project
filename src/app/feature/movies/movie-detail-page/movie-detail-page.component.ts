import { Component, OnChanges, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CommentService } from 'src/app/core/comment.service';
import { IUser } from 'src/app/core/interfaces';
import { IMovie } from 'src/app/core/interfaces/movie';
import { IComment } from 'src/app/core/interfaces/comment';
import { MessageBusService, MessageType } from 'src/app/core/message-bus.service';
import { MovieService } from 'src/app/core/movie.service';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.css']
})
export class MovieDetailPageComponent implements OnInit, OnChanges {

  movie: IMovie;
  commentList: IComment[]
  movieId: BehaviorSubject<string> = new BehaviorSubject("");
  canLike = new BehaviorSubject(true);

  canSubscribe: boolean = false;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;
  currentUser$: Observable<IUser | undefined> = this.authService.currentUser$;
  userId: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private movieService: MovieService,
    private commentService: CommentService,
    private router: Router,
    private messageBusService: MessageBusService
  ) { }

  ngOnInit(): void {

    const movieId = this.activatedRoute.snapshot.params['movieId'];
    this.movieService.loadMovieById(movieId).subscribe(movie => {
      this.movie = movie;
      this.movieId.next(movieId)
      this.isLoggedIn$.subscribe(isLogged => {
        if (isLogged) {
          this.currentUser$.subscribe({
            next: user => {
              this.userId = user!._id;
              this.canSubscribe = !this.movie.subscribers.includes(this.userId);
            }
          });
        }
      })

      this.commentService.loadCommentsList(movieId).subscribe({
        next: (commentList) => {
          this.commentList = commentList
          this.commentList.map(comment => {
            if (comment.userId._id === this.userId) {
              this.canLike.next(false)
            }
          })
        }
      })


    });

  }


  ngOnChanges(): void {
    this.currentUser$.subscribe(user => {
      this.userId = user!._id;
    });
    this.canSubscribe = !this.movie.subscribers.includes(this.userId);
  }

  deleteHandler(): void {
    this.movieId.subscribe(movieId => {

      if (window.confirm('Are you shure you want to delete this movie!')) {
        this.movieService.deleteMovie$(movieId).subscribe({
          next: () => {
            this.router.navigate(['/movies']);
            this.messageBusService.notifyForMessage({ text: 'Movie deleted!', type: MessageType.Success })
          }
        })

      }
    });

  }

  submitNewComment(commentForm: NgForm) {
    const { commentText } = commentForm.value;

    this.movieId.subscribe(movieId => {
      this.movieService.addMovieComment(commentText, movieId).subscribe({
        next: () => {
          this.messageBusService.notifyForMessage({ text: 'Comment added.', type: MessageType.Success })
          commentForm.resetForm()
          this.commentService.loadCommentsList(movieId).subscribe({
            next: (commentList) => {
              this.commentList = commentList
            }
          })
        },
        error: (err) => {
          this.messageBusService.notifyForMessage({ text: err.error.message, type: MessageType.Error })
        }
      })

    })
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



  handleSubscription() {
    this.canSubscribe = !this.canSubscribe;
  }

  canComment(movieId: string) {
    this.commentService.loadCommentsList(movieId).subscribe({
      next: (commentList) => {
        commentList.map(commnet => {

          if (commnet.userId._id == this.userId) {
            return false
          }
          return true
        })
      }
    })

  }

  likeHandler(isLiking: boolean, commentId: string) {
    if (isLiking) {
      this.commentService.commentLike(commentId).subscribe({
        next: () => {
          this.messageBusService.notifyForMessage({ text: 'Liked comment', type: MessageType.Success })
          this.canLike.next(!this.canLike)
        }
      })
    } else {
      this.commentService.commentDislike(commentId).subscribe({
        next: () => {
          this.messageBusService.notifyForMessage({ text: 'Disliked comment', type: MessageType.Success })
          this.canLike.next(!this.canLike)
        }
      })
    }
  }


}
