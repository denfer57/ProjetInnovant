import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EventFormPage} from '../event-form/event-form';

/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  evtfPage = EventFormPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

}
