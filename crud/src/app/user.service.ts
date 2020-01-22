// import { Injectable } from '@angular/core';
// // import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';
// // import 'rxjs/add/operator/map';
// import { ajax } from 'rxjs/ajax';
// import { map, retry, catchError } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';
import { User } from './user';

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  // private _getUrl = 'http://localhost:3000/api/users';
  // // private _getUrl = '/api/users';
  // private _postUrl = '/api/user';
  // private _putUrl = '/api/user/';
  // private _deleteUrl = '/api/user/';

  constructor(private http: HttpClient) { }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError('Something bad happened; please try again later.');
  // };

  // getUsers(): Observable<any> {
  //   return this._http.get(this._getUrl)
  //     .pipe(map((response: HttpResponse) => response));
  // }

  // getUsers(): Observable<User[]> {
  //   return this._http.get<User[]>(this._getUrl);
  //     // .pipe(map((response: HttpResponse) => response));
  // }

  // Get all students
  getUsers() {
    return this.http.get(`${this.endpoint}/users`);
  }

  // // Get all students
  // GetStudents() {
  //   return this.http.get(`${this.endpoint}`);
  // }


  // addUser(user: User) {
  //   // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   // const options = new HttpRequest({ headers: headers });
  //   // return this._http.post(this._postUrl, JSON.stringify(user), options)
  //   return this._http.post(this._postUrl, JSON.stringify(user))
  //     // .pipe(map((response: HttpResponse) => response));
  // }

  // Add student
  addUser(user: User): Observable<any> {
    let API_URL = `${this.endpoint}/user`;
    return this.http.post(API_URL, user)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // // Add student
  // AddStudent(data: Student): Observable<any> {
  //   let API_URL = `${this.endpoint}/add-student`;
  //   return this.http.post(API_URL, data)
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }

  // updateUser(user: User) {
  //   // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   // const options = new HttpRequest({ headers: headers });
  //   return this._http.put(this._putUrl + user._id, JSON.stringify(user))
  //   // return this._http.put(this._putUrl + user._id, JSON.stringify(user), options)
  //   //  .pipe(map((response: HttpResponse) => response));
  // }

  // Update student
  updateUser(user: User): Observable<any> {
    let API_URL = `${this.endpoint}/user/`;
    return this.http.put(API_URL, user, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // // Update student
  // UpdateStudent(id, data: Student): Observable<any> {
  //   let API_URL = `${this.endpoint}/update/${id}`;
  //   return this.http.put(API_URL, data, { headers: this.headers }).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }

  // deleteUser(user: User) {
  //   return this._http.delete(this._deleteUrl + user._id)
  //   //  .pipe(map((response: HttpResponse) => response));
  // }

  // // Delete student
  // deleteUser(user: User): Observable<any> {
  //   var API_URL = `${this.endpoint}/user/`;
  //   return this.http.delete(API_URL, user, { headers: this.headers }).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }

  // // Delete student
  // DeleteStudent(id): Observable<any> {
  //   var API_URL = `${this.endpoint}/delete-student/${id}`;
  //   return this.http.delete(API_URL).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


  // getUsers()
  // {
  //   this._http.get(this._getUrl).then(response =>
  //     console.log(response));
  // }


}
