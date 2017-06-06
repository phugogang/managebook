import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routeSlideStateTrigger } from '../../animations';
import { AppService } from '../../app.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  animations: [routeSlideStateTrigger],
  styles: [`
        :host {
            display: block;
        }
    `]
})

export class SettingPageComponent implements OnInit {
  @HostBinding('@routeSlideState') routerAnimation = true;

  updateProfileForm: FormGroup;
  updatePasswordForm: FormGroup;
  currentPass: string;
  user = "sadsad";
  profileModify: boolean = false;
  loading_page: boolean = false;


  constructor(private router: Router,
    private _appService: AppService) {

  }

  ngOnInit() {

    this._appService.getProfile()
      .subscribe((user) => {
        if (user) {
          this.currentPass = user.password;
          this.updateProfileForm = new FormGroup({
            city: new FormControl(user.city, Validators.required),
            state: new FormControl(user.state, Validators.required),
          });
        }


        this.updateProfileForm.valueChanges
          .debounceTime(300)
          .distinctUntilChanged()
          .subscribe(() => {
            this.profileModify = true;
          })
      });


    this.updatePasswordForm = new FormGroup({
      password: new FormControl("", Validators.required),
      newPassword: new FormControl("", Validators.required),
      confirmNewPassword: new FormControl("", [Validators.required, this.matchOtherValidator('newPassword')])
    });

  }




  updateProfile() {
    this.loading_page = true;
    var city = this.updateProfileForm.value.city;
    var state = this.updateProfileForm.value.state;
    this._appService.updateProfile(city, state)
      .subscribe((res) => {
        console.log(res);
      })
  }

  updatePassword() {
    this.loading_page = true;
    console.log(this.updatePasswordForm.value);
    var newPassword = this.updatePasswordForm.value.newPassword;
    this._appService.updatePassword(newPassword)
      .subscribe((res) => {
        console.log(res);
      })
  }





  matchOtherValidator(otherControlName: string) {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return (control: FormControl): { [s: string]: boolean } => {
      if (!control.parent) {
        return null;
      }

      // Initializing the validator.
      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;

        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }


      if (otherControl.value !== thisControl.value) {
        return { matchOther: true };
      }

      return null;


    }

  }


}

