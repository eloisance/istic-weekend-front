import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/AuthenticationService';
import { SportService } from '../_services/SportService';
import { ActivityService } from '../_services/ActivityService';
import { UserService } from '../_services/UserService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SportService, ActivityService, UserService]
})
export class DashboardComponent implements OnInit {

  public user: any;
  public sports: any;
  public lat: number;
  public lng: number;

  constructor(
    public auth: AuthenticationService,
    private sportService: SportService,
    private activityService: ActivityService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.lat = 48.1144859;
    this.lng = -1.6287058;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.sportService.getAll().subscribe(data => {
      this.sports = data;
      console.log('all sports', data);
    }, error => {
      console.log('getAll sports failed: ' + error);
    });
  }

  /**
   * Add user activity
   */
  onAddActivityClick(levelId: Number) {
    this.activityService.addActivity(levelId).subscribe(data => {
      console.log('onAddActivityClick: ' + data);
      this.userService.getUser().subscribe(d => {
        this.user = JSON.parse(localStorage.getItem('user'));
      }, error => {});
    }, error => {
      console.log('onAddActivityClick failed ' + error);
    });
  }

  /**
   * Logout user
   */
  onClickLogout() {
    this.auth.logout();
  }
}
