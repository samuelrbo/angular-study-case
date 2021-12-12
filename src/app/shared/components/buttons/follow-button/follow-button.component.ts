import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Profile, ProfileService, UserService } from '../../../../core';
import { of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent {

  @Input() profile!: Profile;
  @Output() toggle = new EventEmitter<boolean>();

  isSubmitting = false;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService,
  ) {}

  toggleFollowing() {
    const that = this;
    this.isSubmitting = true;

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        if (this.profile.following) {
          return this.profileService.follow(this.profile.username)
            .pipe(tap(
              {
                next: () => {
                  that.isSubmitting = false;
                  that.toggle.emit(true);
                },
                error: () => that.isSubmitting = false
              }
            ));
        }
        else {
          return this.profileService.unfollow(this.profile.username)
            .pipe(tap(
              {
                next: () => {
                  that.isSubmitting = false;
                  that.toggle.emit(false);
                },
                error: () => that.isSubmitting = false
              }
            ));
        }
      }
    )).subscribe();
  }
}
