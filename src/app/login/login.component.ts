import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/AuthenticationService';
import { UserService} from '../_services/UserService';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService, UserService]
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router) {
  }

  loginForm: FormGroup;
  loginError: String = null;

  ngOnInit() {
    this.checkIsAlreadyAuthenticated();
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
    this.loginForm.setValue({email: 'emmanuel.loisance@gmail.com', password: '1234'});
  }

  /**
   * Call getToken from AuthenticationService
   */
  onLoginClick() {
    const username = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    if (!username || !password) {
      this.loginError = 'Please fill the form.';
      return;
    }

    this.authenticationService.getToken(username, password).subscribe(data => {
      console.log('data', data);
      this.getUser();
    }, error => {
      console.log('error', error);
      this.loginError = 'Sorry! Something goes wrong. We can\'t find this account.';
    });
  }

  /**
   * Call getUser from UserService
   */
  getUser() {
    this.userService.getUser().subscribe(data => {
      console.log('data', data);
      this.router.navigateByUrl('/dashboard');
    }, error => {
      console.log('error', error);
      this.loginError = 'Sorry! Something goes wrong. We can\'t find this account.';
    });
  }

  private checkIsAlreadyAuthenticated() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

}
