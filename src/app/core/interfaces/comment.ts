import { IBase } from './base';
import { IUser } from './user';
import { IMovie } from './movie';

export interface IComment extends IBase {
  text: string;
  userId: IUser;
  movieId: IMovie;
  likes: IUser[]
}
