import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(private http: Http) {
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
      'http://localhost:8080/api/users',
      options
    ).map((response: Response) => {
      const data = response.json();
      localStorage.setItem('user', data);
      return data;
    });
  }
}
