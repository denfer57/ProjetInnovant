import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http, Response} from '@angular/http';

/*
  Generated class for the EventProfil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-profil',
  templateUrl: 'event-profil.html'
})
export class EventProfilPage {

  public name: any;
  public categorie: any;
  public description: any;
  public address: any;
  public user : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,) {
    this.getUser(this.navParams.get('userid'));
    console.log(this.user);
    this.name = this.navParams.get('name');
    this.categorie = this.navParams.get('categorie');
    this.description = this.navParams.get('description');
    this.address = this.navParams.get('address');

  }

  getUser(v){
    this.http.get("http://ionicserver:8888/api/users/get?id="+ v).subscribe(function(res) {
      document.getElementById("user").innerHTML=JSON.parse(res["_body"]).user;
      //console.log(document.getElementById("user"));

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventProfilPage');
  }

}
