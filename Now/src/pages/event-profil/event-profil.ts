import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.get('name');
    this.categorie = this.navParams.get('categorie');
    this.description = this.navParams.get('description');
    this.address = this.navParams.get('address');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventProfilPage');
  }

}
