import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventFormPage } from '../event-form/event-form';
import { FilterPage } from '../filter/filter';
import {EventProfilPage} from '../event-profil/event-profil';
import {Http} from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the Events page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

var latitude, longitude;


@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  evtfPage = EventFormPage;
  filtPage = FilterPage;
  evtpPage = EventProfilPage;
  @ViewChild('post_content') post_content;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,private geolocation: Geolocation) {
    this.geolocation = geolocation;
    //this.recupererLatLng();
    this.getEvents();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  getEvents(){
    let city: string;
    let locationOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    // Get user's position
    this.geolocation.getCurrentPosition(locationOptions).then((resp) => {
      latitude = resp.coords.latitude;
      longitude = resp.coords.longitude;
      //console.log(latitude+ "     "+longitude);
      var link = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude;
      var link2 = "http://ionicserver:8888/api/events/get";
      let state: string;
      this.http.get(link)
        .map(res => {
          return res.json();
        })
        .subscribe(
          data => {
            data.results[0].address_components.map((item) => {
              if (item.types[0] === "locality") {
                city = item.long_name;
                //console.log(city +"ccc");
                var events=[];
                this.http.get(link2 + "?city=" + city).subscribe(function(res) {
                  //console.log(res);
                  events = JSON.parse(res["_body"]);
                  //console.log(events+"test");

                  var html="";
                  var marker;
                  var infoContent=[];
                  console.log(events[1]['name']+" rrr");
                  console.log(events[0]['name']+" rrr");
                  console.log(events.length);
                  for (var i = 0; i <= events.length-1; i++) {
                    console.log(i);
                    console.log(events[i]['name']+" rrr");

                    html +='<ion-card style="background-color: #424242">'+

                      '<img src="img/Party_Dream_Color_party.jpg" [navPush]="evtpPage">'+

                      '<ion-card-content [navPush]="evtpPage">'+
                      '<ion-card-title color="white">'+
                      events[i]["name"]+
                      '<ion-chip color="'+events[i]["categorie"]+'">'+
                      '<ion-label>'+events[i]["categorie"]+'</ion-label>'+
                      '</ion-chip>'+
                      '</ion-card-title>'+
                      '<p color="grey">'+
                      events[i]["description"]+
                      '</p>'+
                      '</ion-card-content>'+

                      ' <ion-row no-padding>'+
                      ' <ion-col>'+
                      '<button ion-button clear small color="secondary" icon-left>'+
                      '<img src="img/ic_check_circle_black_24px.svg" style="height: 24px; width: 24px;"/>'+
                      'Checked'+
                      '</button>'+
                      '</ion-col>'+
                      '<ion-col text-center>'+
                      '<button ion-button clear small color="primary" icon-left>'+
                      '<img src="img/ic_directions_walk_black_24px.svg" style="height: 24px; width: 24px;"/>'+
                      'I Go'+
                      '</button>'+
                      '</ion-col>'+
                      '<ion-col text-right>'+
                      '<button ion-button clear small color="danger" icon-left>'+
                      '<img src="img/ic_cancel_black_24px.svg" style="height: 24px; width: 24px;"/>'+
                      'Ended'+
                      '</button>'+
                      '</ion-col>'+
                      '</ion-row>'+
                      '</ion-card>';

                  }
                  html+='<ion-fab right bottom>'+
                  '<button ion-fab color="light" [navPush]="evtfPage">'+
                    '<ion-icon name="add"></ion-icon>'+
                  '</button>'+
                  '</ion-fab>';

                  var t = "<ion-card style=\"background-color: #424242\">"+

                  "<img src=\"img/Party_Dream_Color_party.jpg\" [navPush]=\"evtpPage\">"+

                  "<ion-card-content [navPush]=\"evtpPage\">"+
                    "<ion-card-title color=\"white\">"+
                    "Color run "+
                  "<ion-chip color=\"sport\">"+
                  "<ion-label>Sport</ion-label>"+
                 "</ion-chip>"+
                  "</ion-card-title>"+
                  "<p color=\"grey\">"+
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut accumsan lacus. Nullam laoreet faucibus"+
                  "urna ut semper. Nullam ut urna sed."+
                  "</p>"+
                  "</ion-card-content>"+

                  "<ion-row no-padding>"+
                  "<ion-col>"+
                  "<button ion-button clear small color=\"secondary\" icon-left>"+
                  "<img src=\"img/ic_check_circle_black_24px.svg\" style=\"height: 24px; width: 24px;\"/>"+
                    "Checked"+
                    "</button>"+
                    "</ion-col>"+
                    "<ion-col text-center>"+
                  "<button ion-button clear small color=\"primary\" icon-left>"+
                  "<img src=\"img/ic_directions_walk_black_24px.svg\" style=\"height: 24px; width: 24px;\"/>"+
                    "I Go"+
                  "</button>"+
                  "</ion-col>"+
                  "<ion-col text-right>"+
                  "<button ion-button clear small color=\"danger\" icon-left>"+
                  "<img src=\"img/ic_cancel_black_24px.svg\" style=\"height: 24px; width: 24px;\"/>"+
                    "Ended"+
                    "</button>"+
                    "</ion-col>"+
                    "</ion-row>"+
                    "</ion-card>";
                  //document.getElementById("content").innerHTML=html;
                  //document.getElementById("content").innerHTML=t;
                  //content:string = html;




                });
              }
              if (item.types[0] === "administrative_area_level_1") {
                state = item.short_name;
              }



            });
          });




    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }





}
