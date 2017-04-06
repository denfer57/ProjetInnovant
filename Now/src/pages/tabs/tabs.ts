import { Component } from '@angular/core';
import { EventsPage } from '../events/events';
import { MapPage } from '../map/map';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = EventsPage;
  tab2Root: any = MapPage;
  tab3Root: any = ProfilePage;

  constructor() {

  }
}
