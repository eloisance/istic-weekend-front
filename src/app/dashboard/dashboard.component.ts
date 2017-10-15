import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/AuthenticationService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})
export class DashboardComponent implements OnInit {

  public user: any;

  constructor(
    public auth: AuthenticationService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Logout user
   */
  onClickLogout() {
    this.auth.logout();
  }

}
