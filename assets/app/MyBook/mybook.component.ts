import { Component, OnInit, HostBinding } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { routeSlideStateTrigger, itemStateTrigger } from '../animations';
import { AppService } from '../app.service';
@Component({
    selector: 'mybook',
    templateUrl: './mybook.component.html',
    animations: [routeSlideStateTrigger, itemStateTrigger],
    styles: [`
        :host {
            display: block;
        }

        .row {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display:         flex;
        flex-wrap: wrap;
        }
        .row > [class*='col-'] {
        display: flex;
        flex-direction: row;
    }
    
    //    .col-md-2:nth-child(6n+1){
    //         clear: left;            
    //     }

        
    
    
    `]
})

export class MyBookComponent implements OnInit {
    @HostBinding('@routeSlideState') routerAnimation = true;
    results;
    displayResult = [];
    constructor(private _appService: AppService) { }

    ngOnInit() {
        this._appService.getMyBooks()
            .subscribe((response) => {
                console.log(response);
                if (response.length > 0) {
                    this.displayResult.push(response[0])
                }
                this.results = response;
            })
    }

    onDeleteItem(item, lstIndex: number) {
        console.log(item);
        this._appService.deleteItem(item._id)
            .subscribe((res) => {
                this.displayResult.splice(lstIndex, 1);
                console.log(res);
            })
    }

    onDisplayResult(event: AnimationEvent, lstIdx: number) {
        if (event.fromState != 'void') {
            return;
        }
        if (this.results.length > lstIdx + 1) {
            this.displayResult.push(this.results[lstIdx + 1])
        } else {
            this.results = this.displayResult;
        }



    }



}