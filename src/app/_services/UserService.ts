import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  /**
   * POST User from API
   */
  registerUser(fn: String, ln: String, email: String, password: String, lat: Number, lng: Number) {
    return this.http.post(
      environment.apiUrl + '/api/user',
      { 'firstname': fn, 'lastname': ln, 'email': email, 'password': password, 'lat': lat, 'lng': lng }
    ).map((response: Response) => {
      return response;
    });
  }

  /**
   * GET User from API
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
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    });
  }
}
