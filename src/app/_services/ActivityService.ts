import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class ActivityService {

  constructor(private http: Http) { }

  /**
   * POST Activity from API
   */
  addActivity(levelId: Number) {
    const access_token = localStorage.getItem('access_token');
    const headers = new Headers({
      'Authorization': 'Bearer ' + access_token,
    });
    const options = new RequestOptions({headers: headers});
    return this.http.post(
      environment.apiUrl + '/api/activity',
      { 'id': levelId },
      options
    ).map((response: Response) => {
      return response;
    });
  }
}
