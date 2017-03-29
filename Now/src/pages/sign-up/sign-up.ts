import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the SignUp page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {

  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, toastCtrl: ToastController) {
    this.data = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  public submit(){
    var link = 'http://ionicserver:8888/api/users';
    this.http.post(link, {username : this.data.username , password : this.data.password, confirmpassword : this.data.confirmpassword, email : this.data.email } ).subscribe(function (res){
      if(JSON.parse(res["_body"]).erreur==null){
        console.log("pas d'erreur");
        window.localStorage.setItem('username',JSON.parse(res["_body"]).username);
        window.localStorage.setItem('email',JSON.parse(res["_body"]).email);
        window.localStorage.setItem('token',JSON.parse(res["_body"]).token);
        document.getElementById("rep").innerHTML=JSON.parse(res["_body"]).username+" has been registered";

      }else{
        console.log(JSON.parse(res["_body"]).erreur);
        document.getElementById("rep").innerHTML=JSON.parse(res["_body"]).erreur;

      }
    });
  }


}
