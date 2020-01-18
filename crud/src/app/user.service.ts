import { Injectable } from '@angular/core';
// import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { ajax } from 'rxjs/ajax';
import { map, retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _getUrl = 'http://localhost:3000/api/users';
  private _postUrl = '/api/user';
  private _putUrl = '/api/user/';
  private _deleteUrl = '/api/user/';

  constructor(private _http: HttpClient) { }

  // getUsers(): Observable<any> {
  //   return this._http.get(this._getUrl)
  //     .pipe(map((response: HttpResponse) => response));
  // }

  getUsers() {
    return this._http.get(this._getUrl);
      // .pipe(map((response: HttpResponse) => response));
  }

  addUser(user: User) {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const options = new HttpRequest({ headers: headers });
    // return this._http.post(this._postUrl, JSON.stringify(user), options)
    return this._http.post(this._postUrl, JSON.stringify(user))
      // .pipe(map((response: HttpResponse) => response));
  }

  updateUser(user: User) {
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const options = new HttpRequest({ headers: headers });
    return this._http.put(this._putUrl + user._id, JSON.stringify(user))
    // return this._http.put(this._putUrl + user._id, JSON.stringify(user), options)
    //  .pipe(map((response: HttpResponse) => response));
  }

  deleteUser(user: User) {
    return this._http.delete(this._deleteUrl + user._id)
    //  .pipe(map((response: HttpResponse) => response));
  }

  // getUsers()
  // {
  //   this._http.get(this._getUrl).then(response =>
  //     console.log(response));
  // }


}
