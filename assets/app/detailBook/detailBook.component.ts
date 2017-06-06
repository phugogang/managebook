import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: "detailBook",
    templateUrl: "./detailBook.component.html",
    styles: [`
        .detailinfo {
            margin-bottom: 50px;;
        }
    `]

})


export class DetailBookComponent implements OnInit, OnDestroy {
    result;
    subscription: Subscription;

    constructor(private _router: Router,
        private _location: Location,
        private _appService: AppService,
        private activatedRouter: ActivatedRoute) {
        this.subscription = this.activatedRouter.params
            .subscribe((params: any) => {
                let id = params["id"];

                this._appService.getDetailBook(id)
                    .subscribe((response) => {                        
                        this.result = response;
                    })
            })
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onBuyIt(result) {
        // this._location.go(result.url);
        window.open(result.url, "_blank");
    }

    onEdit(result) {
        this._router.navigate(['/books', result._id, 'edit']);
       
    }

    onDelete(result) {
         this._appService.deleteItem(result._id)
            .subscribe((res) => {
                this._router.navigate(["/books"]);
            }) 
    }


}