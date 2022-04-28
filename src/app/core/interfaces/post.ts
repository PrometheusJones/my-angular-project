import { IBase } from './base';
import { IUser } from './user';
import { IMovie } from './movie';

export interface IPost extends IBase {
  text: string;
  userId: IUser;
  movieId: IMovie;
}
