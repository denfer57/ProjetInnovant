import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = {};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventFormPage');
  }

  public checkLength(len, text) {
    var fieldLength = text.value.length;
    if (fieldLength <= len) {
      return true;
    }
    else {
      var str = text.value;
      str = str.substring(0, str.length - 1);
      text.value = str;
    }
  }
}







