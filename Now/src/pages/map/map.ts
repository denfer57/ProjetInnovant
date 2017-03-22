  import { Platform } from 'ionic-angular';
  import { Component } from '@angular/core'
  import { Geolocation } from 'ionic-native';

  declare var google;

  @Component({
    selector: 'map',
    templateUrl: 'map.html'
  })

  export class MapPage {

    public map: any;
    public marker: any;

      constructor(public platform: Platform) {
          this.platform = platform;
          this.initializeMap();
      }

      initializeMap() {

          this.platform.ready().then(() => {

          // Set location parameters
          let locationOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
           };

           // Get user's position
           Geolocation.getCurrentPosition(locationOptions).then((resp) => {
           let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

          // Set map parameters
          let mapOptions = {
            center: latLng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        // Creation and display map
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        // Set marker parameters
        let markerOptions = {
            position: this.map.getCenter(),
            map: this.map
          };

          // Creation and display marker
          this.marker = new google.maps.Marker(markerOptions);


          }).catch((error) => {
            console.log('Error getting location', error);
          });


          });
      }
  }
