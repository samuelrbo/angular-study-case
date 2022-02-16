import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '@core/services';
import { User } from '@core/models';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  settingsForm: FormGroup;
  errors: any = {};
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    });
  }

  ngOnInit() {
    Object.assign(this.user, this.userService.getCurrentUser());
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.rejectAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    const that = this;

    this.isSubmitting = true;
    this.updateUser(this.settingsForm.value);

    this.userService
      .update(this.user)
      .subscribe({
        next(data: User) {
          that.router.navigateByUrl('/profile/' + data.username);
        },
        error(err: any) {
          that.errors = err;
          that.isSubmitting = false;
        }
      }
    );
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }
}
