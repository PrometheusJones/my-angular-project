import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './interfaces';


//DTO data transfer object
export interface CreateUserDto { username: string, email: string, password: string, movieId: string, tel?: string }

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getProfile$(): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.apiUrl}/users/profile`, { withCredentials: true })
  }

  updateProfile$(userData: CreateUserDto): Observable<IUser> {
    return this.httpClient.put<IUser>(`${environment.apiUrl}/users/profile`, userData, { withCredentials: true });
  }
}
