"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var events_1 = require('../events/events');
/*
  Generated class for the SignUp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SignUpPage = (function () {
    function SignUpPage(navCtrl, navParams, http, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.data = {};
    }
    SignUpPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignUpPage');
    };
    SignUpPage.prototype.submit = function () {
        var _this = this;
        var link = 'http://ionicserver:8888/api/users';
        this.http.post(link, { username: this.data.username, password: this.data.password, confirmpassword: this.data.confirmpassword, email: this.data.email }).subscribe(function (res) {
            if (JSON.parse(res["_body"]).erreur == null) {
                console.log("pas d'erreur");
                window.localStorage.setItem('username', JSON.parse(res["_body"]).username);
                window.localStorage.setItem('email', JSON.parse(res["_body"]).email);
                window.localStorage.setItem('token', JSON.parse(res["_body"]).token);
                //document.getElementById("rep").innerHTML=JSON.parse(res["_body"]).username+" has been registered";
                _this.navCtrl.setRoot(events_1.EventsPage);
            }
            else {
                console.log(JSON.parse(res["_body"]).erreur);
                document.getElementById("rep").innerHTML = JSON.parse(res["_body"]).erreur;
            }
        });
    };
    SignUpPage = __decorate([
        core_1.Component({
            selector: 'page-sign-up',
            templateUrl: 'sign-up.html'
        })
    ], SignUpPage);
    return SignUpPage;
}());
exports.SignUpPage = SignUpPage;
