import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { routeSlideStateTrigger, buttonStateTrigger } from '../animations';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
    selector: 'newBook',
    templateUrl: './newBook.component.html',
    animations: [routeSlideStateTrigger, buttonStateTrigger],
    styles: [`
        :host {
            display: block;
        }
    `]
})

export class NewBookComponent implements OnInit {
    @HostBinding('@routeSlideState') routerAnimation = true;
    newBookForm: FormGroup;

    constructor(private _appService: AppService, private _router: Router) { }


    ngOnInit() {
        this.newBookForm = new FormGroup({
            name: new FormControl("", Validators.required),
            author: new FormControl("", Validators.required),
            image: new FormControl("", [Validators.required, Validators.pattern("^(https?:).*")]),
            language: new FormControl("", Validators.required),
            pages: new FormControl("", [Validators.required, Validators.pattern("^(0|[1-9][0-9]*)$")]),
            url: new FormControl("", [Validators.required, Validators.pattern("^(https?:).*")]),
            description: new FormControl("", Validators.required)
        })
    }


    onSubmit() {
        var newBook = this.newBookForm.value;
        this._appService.addNewBook(newBook)
            .subscribe((book) => {
                console.log(book);
                this._router.navigate(["/books", book._id])
            })
    }

}