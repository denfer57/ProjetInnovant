import { Component } from '@angular/core';
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
//ionicserver
var IP = "ionicserver";
@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {
  evtfPage = EventFormPage;
  filtPage = FilterPage;
  evtpPage = EventProfilPage;
  public content ='';
  city: "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,private geolocation: Geolocation) {
    this.geolocation = geolocation;
    //this.recupererLatLng();
    this.getEvents();

    //this.ajouterHtml("test");
    //console.log("ville :  "+this.city);

  }

  ajouterHtml(v){
    console.log(document.getElementById("card-0"));
    document.getElementById("card-0").style.display="block";
    //this.content=v;
  }

  creerHtml(events){
    //var html='';
    for (var i = 0; i <= events.length-1; i++) {
    document.getElementById("title-"+i).innerHTML=events[i]["name"];
    document.getElementById("p-"+i).innerHTML=events[i]["description"];
	//console.log(events[i]["categorie"]);
    //(<HTMLLabelElement>document.getElementById("categ-"+i)).htmlFor=events[i]["categorie"];
	(<HTMLImageElement>document.getElementById("img-"+i)).src = "http://"+IP+"/ProjetInnovant/Now/www/img/uploads/"+events[i]["picture"];
    document.getElementById("card-"+i).style.display="block";
    }
    //this.ajouterHtml(html);
  }

  getEventsCity(c){
    var link2 = "http://"+IP+":8888/api/events/get";

    this.http.get(link2 + "?city=" + c).map(res => {
      return res.json();
    }).subscribe(data => {
      this.creerHtml(data);


    });


  }

  getCity(lat,long){
    var link = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long;
    this.http.get(link).map(res => {
      return res.json();
    }).subscribe(data => {
      data.results[0].address_components.map((item) => {
        if (item.types[0] === "locality") {
          this.city = item.long_name;
          this.getEventsCity(this.city);
        }



      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  getEvents(){

    let locationOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    // Get user's position
    this.geolocation.getCurrentPosition(locationOptions).then((resp) => {
      latitude = resp.coords.latitude;
      longitude = resp.coords.longitude;
      this.getCity(latitude,longitude);


    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }





}
