import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) {
  }

  /**
   * Get access token from OAuth API
   * @param {string} username
   * @param {string} password
   */
  getToken(username: string, password: string) {
    const headers = new Headers({
      'Authorization': 'Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const options = new RequestOptions({headers: headers});
    const credentials = 'grant_type=password&username=' + username + '&password=' + password;
    return this.http.post(
      'http://localhost:8080/oauth/token',
      credentials,
      options
      )
      .map((response: Response) => {
        const data = response.json();
        localStorage.setItem('access_token', data.access_token);
        return data;
      });
  }
}
