import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { EventsPage } from '../pages/events/events';
import { EventFormPage } from '../pages/event-form/event-form';
import { SignInPage } from '../pages/sign-in/sign-in';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { MapPage } from '../pages/map/map';
import { ProfilePage } from '../pages/profile/profile';
import { FilterPage } from '../pages/filter/filter';
import { EventProfilPage } from '../pages/event-profil/event-profil';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    EventsPage,
    SignInPage,
    SignUpPage,
    EventFormPage,
    ProfilePage,
    EventProfilPage,
    FilterPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    HomePage,
    EventsPage,
    SignInPage,
    SignUpPage,
    EventFormPage,
    ProfilePage,
    EventProfilPage,
    FilterPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
	Transfer,
	Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}