import { Platform, NavController } from 'ionic-angular';
import { Component } from '@angular/core'
import { Geolocation } from '@ionic-native/geolocation';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { EventProfilPage } from '../event-profil/event-profil';

declare var google;

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

  /*public details() {

    this.navCtrl.push(EventProfilPage);

  }*/

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
        let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        // Set map parameters
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          setMyLocationEnabled: true
        }
        var events;

        var link = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + resp.coords.latitude + "," + resp.coords.longitude;
        var link2 = "http://ionicserver:8888/api/events/get";

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
            this.http.get(link2 + "?city=" + city).subscribe(function(res) {
              events = JSON.parse(res["_body"]);

              var marker;
              var infoContent=[];
              var infoWindow = new google.maps.InfoWindow();

              for (var i = 0; i < events.length; i++) {
                this.navCtrl = NavController;
                infoContent[i] = '<div style="color: #000000;">' +
                '<h3>'+ events[i]["name"]+'</h3> <p>'+events[i]["description"]+'</p>' +
                /*test avec fonction details() direct dans le HTML
                '<script language="JavaScript" type="text/javascript"> ' +
                'function details() { this.navCtrl.push(EventProfilPage); }' +
                '</script>' +*/
                '<button ion-button block onclick="details();">More</button>' +
                '</div>';

                var position = new google.maps.LatLng(events[i]["latitude"], events[i]["longitude"]);
                marker = new google.maps.Marker({
                  position: position,
                  map: map,
                  title: events[i]["name"]
                });
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {

                infoWindow.setContent(infoContent[i]);
                infoWindow.open(map, marker);
            }
        })(marker, i));
              }
            });
          });

          // Creation and display map
          map = new google.maps.Map(document.getElementById("map"), mapOptions);

          var userIcon = "img/man-walking-directions-button.png"
        // Set marker parameters
        let markerOptions = {
          position: map.getCenter(),
          icon: userIcon,
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
