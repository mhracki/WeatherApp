import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserDataService } from './user-data.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData: User;
  usersList: User[];
  user: User;
  users: UserDataService[] = [];

  apiUrl = 'api/users';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  getUsers(): Observable<UserDataService[]> {
    return this.http.get<UserDataService[]>(this.apiUrl).pipe(
      tap(data => (this.users = data)),
      catchError(this.handleError)
    );
  }

  getUser(id: string): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url).pipe(catchError(this.handleError));
  }
  createUser(): Observable<User> {
    return this.http
      .post<User>(this.apiUrl, this.formData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  updateUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<User>(url, this.formData, this.httpOptions).pipe(
      tap(() => this.formData),
      catchError(this.handleError)
    );
  }
  deleteUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete<User>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
