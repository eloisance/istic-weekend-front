import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class SportService {

  constructor(private http: Http) { }

  /**
   * GET all sports from API
   */
  getAll() {
    const access_token = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': 'Bearer ' + access_token
    });
    const options = new RequestOptions({headers: headers});
    return this.http.get(
      environment.apiUrl + '/api/sports',
      options
    ).map((response: Response) => {
      return response.json();
    });
  }
}
