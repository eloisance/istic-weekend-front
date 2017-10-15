import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../_services/UserService';
import {Router} from "@angular/router";

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

  ngOnInit() {
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

    this.userService.registerUser(fn, ln, email, password).subscribe(data => {
      console.log('data', data);
      this.router.navigateByUrl('/login');
    }, error => {
      console.log('error', error);
    });
  }

}
