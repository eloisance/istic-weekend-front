import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/AuthenticationService';
import { UserService} from '../_services/UserService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, UserService]
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
  }

  ngOnInit() {
  }

  onLoginClick() {
    const username = 'admin@gmail.com';
    const password = 'admin';

    this.authenticationService.getToken(username, password).subscribe(data => {
      console.log('data', data);
      this.getUser();
    }, error => {
      console.log('error', error);
    });
  }

  getUser() {
    this.userService.getUser().subscribe(data => {
      console.log('data', data);
    }, error => {
      console.log('error', error);
    });
  }

}
