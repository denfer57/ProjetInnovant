import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
//import { EventsPage } from '../events/events';
import { TabsPage } from '../tabs/tabs';
/*
  Generated class for the SignIn page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var IP = "192.168.43.215";
//ionicserver
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html'
})
export class SignInPage {

  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.data = {};
    this.navCtrl = navCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  public submit(){
    var _this = this;
    var link = 'http://'+IP+':8888/api/users/login';
    this.http.post(link, {username : this.data.username , password : this.data.password } ).subscribe(function (res){

      if(JSON.parse(res["_body"]).erreur==null){
        console.log("pas d'erreur");
        window.localStorage.setItem('token',JSON.parse(res["_body"]).token);
        //document.getElementById("rep1").innerHTML=JSON.parse(res["_body"]).username+" is connected";
        _this.navCtrl.setRoot(TabsPage);
      }else{
        console.log(JSON.parse(res["_body"]).erreur);
        document.getElementById("rep1").innerHTML=JSON.parse(res["_body"]).erreur;
      }
    });
  }
}
