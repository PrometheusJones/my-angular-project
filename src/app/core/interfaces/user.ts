import { IBase } from "./base";

export interface IUser extends IBase {
    movies: string[],
    coments: string[],
    email: string,
    username: string,
    password: string,
}