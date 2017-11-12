import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../_services/UserService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router) {
  }

  registerForm: FormGroup;
  registerError: String = null;
  centerMapLat: Number;
  centerMapLng: Number;
  centerMapZoom: Number;
  userLat: Number;
  userLng: Number;

  ngOnInit() {
    this.centerMapLat = 47.2745528;
    this.centerMapLng = 2.091125;
    this.centerMapZoom = 5;

    this.registerForm = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
    this.registerForm.setValue({
      firstname: 'Emmanuel',
      lastname: 'Loisance',
      email: 'admin@gmail.com',
      password: 'admin'
    });
  }

  onRegisterClick() {
    const fn = this.registerForm.get('firstname').value;
    const ln = this.registerForm.get('lastname').value;
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;

    if (!fn || !ln || !email || !password || !this.userLat || !this.userLng) {
      this.registerError = 'Please fill the form.';
      return;
    }

    this.userService.registerUser(fn, ln, email, password, this.userLat, this.userLng).subscribe(data => {
      console.log('data', data);
      this.router.navigateByUrl('/login');
    }, error => {
      console.log('error', error);
      this.registerError = 'Sorry! Something goes wrong, we can\'t create your account.';
    });
  }

  onMapRightClick($event) {
    this.userLat = $event.coords.lat;
    this.userLng = $event.coords.lng;
  }
}
