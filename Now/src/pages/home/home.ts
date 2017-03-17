import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SignInPage} from '../sign-in/sign-in';
import {SignUpPage} from '../sign-up/sign-up';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    siPage = SignInPage;
    suPage = SignUpPage;
    constructor(public navCtrl: NavController) {

    }

}
