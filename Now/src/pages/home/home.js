"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var sign_in_1 = require('../sign-in/sign-in');
var sign_up_1 = require('../sign-up/sign-up');
var events_1 = require('../events/events');
var map_1 = require('../map/map');
var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.siPage = sign_in_1.SignInPage;
        this.suPage = sign_up_1.SignUpPage;
        this.evtPage = events_1.EventsPage;
        this.mapPage = map_1.MapPage;
    }
    HomePage = __decorate([
        core_1.Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
