import { IUser } from ".";
import { IBase } from "./base";

export interface IMovie<T = string> extends IBase {
    subscribers: string[];
    posts: T[];
    movieName: string;
    userId: IUser;
    director: string;
    duration: number;
    movieDescription: string;
    imgUrl?: string;
    releseDate?: Date;
    genre: string;
}