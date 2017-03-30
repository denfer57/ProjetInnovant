import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { EventsPage } from '../pages/events/events'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString("#303030");
      Splashscreen.hide();
      StatusBar.styleLightContent();

      if(window.localStorage.getItem('token') == null) {
        this.rootPage = HomePage;
      }
      else {
        this.rootPage = EventsPage;
      }
    });
  }
}
