import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private signupSub: Subscription;

  constructor(public authService: AuthService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    //this.isLoading = true;
    this.signupSub = this.authService
      .createUser(form.value.email, form.value.name, form.value.password)
      .subscribe(
        (response) => {
          if(response.status) {
            this.toastr.success('User Created Successfully', 'Awesome!', {
              timeOut: 2000,
            });
            this.router.navigate(["/"]);
          } else {
            this.toastr.error(response.data[0].msg, 'Error!', {
              timeOut: 2000,
            });
          }
        },
        (error) => {
          this.toastr.error('Sorry, something went wrong', 'Error!', {
            timeOut: 2000,
          });
        }
      );
  }

  ngOnDestroy() {
    if (this.signupSub) {
      this.signupSub.unsubscribe();
    }
  }
}
