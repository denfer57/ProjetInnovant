import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SignInPage} from '../sign-in/sign-in';
import {SignUpPage} from '../sign-up/sign-up';
import {EventsPage} from '../events/events';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    siPage = SignInPage;
    suPage = SignUpPage;
    evtPage = EventsPage;
    constructor(public navCtrl: NavController) {

    }

}
