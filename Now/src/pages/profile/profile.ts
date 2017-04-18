import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { HomePage } from '../home/home';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  segment: string="Posted";

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {

    function getStyle() {
      var temp = document.getElementById("posted_list").style.display;
      return temp;
    }

    function switch01() {
      var current = getStyle();
      if (current == "none") {
        document.getElementById("cont").style.display = "block";
      }
      else {
        document.getElementById("cont").style.display = "none";
      }
    }​


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout(){
    var link = 'http://ionicserver:8888/api/users/logoff?token='+ window.localStorage.getItem('token') ;
    this.http.get(link);
    window.localStorage.setItem('token',null);
    this.navCtrl.setRoot(HomePage);
  }

}
