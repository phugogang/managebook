import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { Location } from '@angular/common';
import { routeSlideStateTrigger, buttonStateTrigger } from '../../animations';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    animations: [routeSlideStateTrigger, buttonStateTrigger],
    styles: [`
        :host {
            display: block;
        }
    `]
})

export class LoginPageComponent implements OnInit {
    @HostBinding('@routeSlideState') routerAnimation = true;

    loginForm: FormGroup;
    error_Login: boolean = false;
    loading_page: boolean = false;
    error_message: string;

    constructor(private router: Router,
        private _location: Location,
        private _appService: AppService) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            "username": new FormControl("", Validators.required),
            "password": new FormControl("", Validators.required)
        })
    }


    onSubmit() {
        this.loading_page = true;
        let user = this.loginForm.value;
        this._appService.authLogin(user)
            .subscribe((user) => {
                if (user.success) {
                    this.error_Login = false;
                    localStorage.setItem("username", user.username);
                    localStorage.setItem("token", user.token);
                    localStorage.setItem("_id", user._id);
                    this._location.back();
                } else {
                    this.error_Login = true;
                    this.error_message = user.message;
                }
            })
    }

}