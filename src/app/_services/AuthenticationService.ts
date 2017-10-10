import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http, private router: Router) {
  }

  /**
   * Return true if user token is not expired yet
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    const nowInSecs: number = Math.round(+Date.now().toString(10) / 1000);
    const expiresAt: string = localStorage.getItem('expires_at');
    return nowInSecs < parseInt(expiresAt, 10);
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

        const nowInSecs: number = Math.round(+Date.now().toString(10) / 1000);
        const expiresAt: number = nowInSecs + parseInt(data.expires_in, 10);

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('expires_at', expiresAt.toString());
        return data;
      });
  }

  /**
   * Revoke all tokens and redirect user
   */
  logout(): void {
    this.router.navigateByUrl('/home').then(value => {
      this.revokeAccess();
    }).catch(reason => {
      this.revokeAccess();
    });
  }

  /**
   * Revoke all tokens saved
   */
  revokeAccess(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
  }
}
