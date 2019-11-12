import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient, private router: Router) { }
  isLoggedIn: boolean = localStorage.getItem('token') ? true : false;
  apiUrl = 'api/authentication';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json'
    })
  };

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }


  login(user) {
      return this.http.post(this.apiUrl, user, this.httpOptions).pipe(
      tap(data => {
        this.isLoggedIn = true;
      }),
      catchError(this.handleError)
    );
  }
  logout() {
    localStorage.setItem('token', null);
    this.router.navigate(['login']);
    this.isLoggedIn = false;
  }

  roleMatch(allowedRoles: Array<string>) {
    let isMatch = false;
    const userRole = localStorage.getItem('token');
    allowedRoles.forEach(element => {
      if (userRole === element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;

  }
}
