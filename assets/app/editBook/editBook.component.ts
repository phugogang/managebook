import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { AppService } from '../app.service';

@Component({
    selector: 'editbook',
    templateUrl: './editBook.component.html',
})

export class EditBookComponent implements OnInit {
    editForm: FormGroup;
    id;
    subscription: Subscription;

    constructor(private activatedRoute: ActivatedRoute,
        private _appService: AppService
    ) {}


    ngOnInit() {
         this.subscription = this.activatedRoute.params
            .subscribe((params: any) => {
                this.id = params["id"];
                this.initForm();
            })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }


    initForm() {
        this._appService.getDetailBook(this.id)
            .subscribe((result) => {
                this.editForm = new FormGroup({
                    name: new FormControl(result.name, Validators.required),
                    author: new FormControl(result.author, Validators.required),
                    image: new FormControl(result.image, Validators.required),
                    language: new FormControl(result.language, Validators.required),
                    pages: new FormControl(result.pages, Validators.required),
                    url: new FormControl(result.url, Validators.required),
                    description: new FormControl(result.description, Validators.required)
                })
            })


    }



}