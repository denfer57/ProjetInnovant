import { Platform, NavController } from 'ionic-angular';
import { Component } from '@angular/core'
import { Geolocation } from '@ionic-native/geolocation';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { EventProfilPage } from '../event-profil/event-profil';

declare var google;
var IP = "192.168.43.215";
//ionicserver
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})

export class MapPage {

  constructor(public platform: Platform, private geolocation: Geolocation, private http: Http, private navCtrl: NavController) {
    this.platform = platform;
    this.geolocation = geolocation;
    this.navCtrl = navCtrl;
    this.initializeMap();
  }


  public afficherEvents(c,map){
    var link2 = "http://"+IP+":8888/api/events/get";
    var events;
    var nav = this.navCtrl;
    this.http.get(link2 + "?city=" + c).subscribe(function(res) {
      events = JSON.parse(res["_body"]);
      var marker;
      var infoContent=[];
      var infoWindow = new google.maps.InfoWindow();


      for (var i = 0; i <= events.length - 1; i++) {
        console.log(nav);

        var position = new google.maps.LatLng(events[i]["latitude"], events[i]["longitude"]);
        marker = new google.maps.Marker({
          position: position,
          map: map,
          title: events[i]["name"]
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            nav.push(EventProfilPage, {
              name: events[i]["name"],
              categorie: events[i]["categorie"],
              description: events[i]["description"],
              address: events[i]["address"]
            });
          }
        })(marker, i));

      }
    });
  }

  public initializeMap() {
    var map;
    this.platform.ready().then(() => {

      // Set location parameters
      let locationOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      };

      // Get user's position
      this.geolocation.getCurrentPosition(locationOptions).then((resp) => {
        //console.log(this.navCtrl);
        let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        // Set map parameters
        let mapOptions = {
          center: latLng,
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          setMyLocationEnabled: true
        }

        var link = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + resp.coords.latitude + "," + resp.coords.longitude;


        let city: string;
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
                }
                if (item.types[0] === "administrative_area_level_1") {
                  state = item.short_name;
                }
              });
              //console.log(this.navCtrl);
              this.afficherEvents(city,map);

            });

        // Creation and display map
        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var icon = "img/man-walking-directions-button.png"
        // Set marker parameters
        let markerOptions = {
          position: map.getCenter(),
          icon: icon,
          map: map

        };

        // Creation and display marker
        var user = new google.maps.Marker(markerOptions);


      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }


}
