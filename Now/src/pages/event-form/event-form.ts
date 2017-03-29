import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the EventForm page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-form',
  templateUrl: 'event-form.html'
})
export class EventFormPage {
	
	data:any;
	
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, toastCtrl: ToastController) {
    this.data = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventFormPage');
  }

  public submit(){
	var token = window.localStorage.getItem('token');
    var link = 'http://ionicserver:8888/api/events';
    this.http.post(link, {token, name : this.data.name, categorie : this.data.categorie, description : this.data.description} ).subscribe(function (res){
      if(JSON.parse(res["_body"]).erreur==null){
        console.log("pas d'erreur");
        document.getElementById("rep").innerHTML="The event "+JSON.parse(res["_body"]).name+" has been registered";
      }else{
        console.log(JSON.parse(res["_body"]).erreur);
        document.getElementById("rep").innerHTML=JSON.parse(res["_body"]).erreur;
      }
    });
   }
}
