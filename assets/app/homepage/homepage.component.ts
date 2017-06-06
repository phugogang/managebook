import {Component} from '@angular/core';
import {itemStateTrigger, searchStateTrigger} from '../animations';

@Component({
    selector: 'homepage',
    templateUrl: './homepage.component.html',
    animations: [itemStateTrigger, searchStateTrigger]    
})

export class HomePageComponent {
    
}