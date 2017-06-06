import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {Router} from '@angular/router';

@Component({
    selector: "navbar",
    templateUrl: './navbar.component.html',
   
})


export class NavbarComponent {  
    constructor(private _appService: AppService,
                private router: Router
    ) {}

    ngOnInit() { 
    }


    onLogOut() {
        localStorage.clear();
        this.router.navigate(['/']);
    }

    
}