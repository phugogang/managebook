import {Component, OnInit, OnDestroy, HostBinding} from '@angular/core';
import {AnimationEvent} from '@angular/animations';
import { routeSlideStateTrigger,itemStateTrigger } from '../animations';
import { AppService,  } from '../app.service';

import 'rxjs/Rx';
import {Subscription, Observable} from "rxjs";


@Component({
  selector: "listBook",
  templateUrl: './listBooks.component.html',
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
    `]

})

export class ListBookComponent implements OnInit, OnDestroy{
    @HostBinding('@routeSlideState') routerAnimation = true;
  results;
  displayResult = [];
  subscription: Subscription;
  constructor (private _appService: AppService) {}

  ngOnInit() {
      this.subscription = this._appService.getListBooks()
          .subscribe((response) => {
            if (response.length > 0) {
            this.displayResult.push(response[0]);            
            }
            this.results = response;
          })
  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onDisplayResult(animationItem: AnimationEvent, lstIdx: number) {
  
    if (animationItem.fromState != 'void') {
      return;
    }

    if (this.results.length > lstIdx + 1) {
      this.displayResult.push(this.results[lstIdx + 1])
    } else {
      this.results = this.displayResult;
    }
  }




 

}
