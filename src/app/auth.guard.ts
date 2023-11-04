import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable({

  providedIn: 'root'

})

export class AuthGuard {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): 
    Observable<any> | Promise<any> | boolean {

    if (!this.authService.isLoggedIn()) {

      this.router.navigate(['/loginreg']); // go to login if not authenticated

      return false;

    }

    return true;

  }
};
