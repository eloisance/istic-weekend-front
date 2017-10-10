import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './AuthenticationService';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthenticationService, public router: Router) {
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.auth.revokeAccess();
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
