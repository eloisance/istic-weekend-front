import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/AuthenticationService';
import { SportService } from '../_services/SportService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SportService]
})
export class DashboardComponent implements OnInit {

  public user: any;
  public sports: any;

  constructor(
    public auth: AuthenticationService,
    private sportService: SportService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.sportService.getAll().subscribe(data => {
      this.sports = data;
      console.log('all sports', data);
    }, error => {
      console.log('getAll sports failed: ' + error);
    });
  }

  /**
   * Logout user
   */
  onClickLogout() {
    this.auth.logout();
  }

}
