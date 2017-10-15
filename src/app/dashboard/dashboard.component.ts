import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/AuthenticationService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
  }

  /**
   *
   */
  onClickLogout() {
    this.auth.logout();
  }

}
