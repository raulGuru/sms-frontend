import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.resetPassword(form.value.email, form.value.password).subscribe(
      (response) => {
        if(response.status) {
          this.toastr.success('Password updated successfully', 'Awesome!', {
            timeOut: 2000,
          });
        } else {
          this.toastr.error(response.message, 'Error!', {
            timeOut: 2000,
          });
        }
      },
      (error) => {
        this.toastr.error('Sorry, something went wrong', 'Error!', {
          timeOut: 2000,
        });
      }
    )
  }

}
