"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
/*
  Generated class for the EventForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EventFormPage = (function () {
    function EventFormPage(navCtrl, navParams, http, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.data = {};
    }
    EventFormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventFormPage');
    };
    EventFormPage.prototype.submit = function () {
        var token = window.localStorage.getItem('token');
        var link = 'http://ionicserver:8888/api/events';
        this.http.post(link, { token: token, name: this.data.name, categorie: this.data.categorie, description: this.data.description }).subscribe(function (res) {
            if (JSON.parse(res["_body"]).erreur == null) {
                console.log("pas d'erreur");
                document.getElementById("rep").innerHTML = "The event " + JSON.parse(res["_body"]).name + " has been registered";
            }
            else {
                console.log(JSON.parse(res["_body"]).erreur);
                document.getElementById("rep").innerHTML = JSON.parse(res["_body"]).erreur;
            }
        });
    };
    EventFormPage.prototype.checkLength = function (len, text) {
        var fieldLength = text.value.length;
        if (fieldLength <= len) {
            return true;
        }
        else {
            var str = text.value;
            str = str.substring(0, str.length - 1);
            text.value = str;
        }
    };
    EventFormPage = __decorate([
        core_1.Component({
            selector: 'page-event-form',
            templateUrl: 'event-form.html'
        })
    ], EventFormPage);
    return EventFormPage;
}());
exports.EventFormPage = EventFormPage;
