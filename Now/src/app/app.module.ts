import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {SignInPage} from '../pages/sign-in/sign-in';
import {SignUpPage} from '../pages/sign-up/sign-up';
import {EventsPage} from "../pages/events/events";


@NgModule({
    declarations: [
        MyApp,
        HomePage,
        SignInPage,
        SignUpPage,
        EventsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        SignInPage,
        SignUpPage,
        EventsPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
