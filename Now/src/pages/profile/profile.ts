import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { HomePage } from '../home/home';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var IP = "192.168.43.215";
//ionicserver
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
    var link = 'http://'+IP+':8888/api/users/logoff?token='+ window.localStorage.getItem('token') ;
    this.http.get(link);
	document.getElementById("tab-t0-0").style.display="none";
    document.getElementById("tab-t0-1").style.display="none";
    document.getElementById("tab-t0-2").style.display="none";
	this.navCtrl.setRoot(HomePage);
	window.localStorage.clear();   
  }

}
