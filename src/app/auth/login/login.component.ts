import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginSub: Subscription;

  constructor(public authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // this.isLoading = true;
    this.loginSub = this.authService
      .login(form.value.email, form.value.password)
      .subscribe(
        (response) => {
          if (response.status) {
            this.authService.setAuthToken(response.data);
            this.toastr.success('Login Successful', 'Awesome!', {
              timeOut: 2000,
            });
          } else {
            this.authService.setAuthFail();
            this.toastr.error(response.message, 'Error!', {
              timeOut: 2000,
            });
          }
        },
        (error) => {
          this.authService.setAuthFail();
          this.toastr.error('Sorry, something went wrong', 'Error!', {
            timeOut: 2000,
          });
        }
      );
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
