import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../_models/User';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  public user: User;

  constructor(private http: Http) {
    this.user = new User();
  }

  /**
   *
   */
  registerUser(fn: String, ln: String, email: String, password: String) {
    return this.http.post(
      environment.apiUrl + '/api/user',
      { 'firstname': fn, 'lastname': ln, 'email': email, 'password': password }
    ).map((response: Response) => {
      return response.json();
    });
  }

  /**
   *
   */
  getUser() {
    const access_token = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': 'Bearer ' + access_token
    });
    const options = new RequestOptions({headers: headers});
    return this.http.get(
      environment.apiUrl + '/api/user',
      options
    ).map((response: Response) => {
      const data = response.json();
      this.user.email = data.email;
      return data;
    });
  }
}
