import { Platform } from 'ionic-angular';
import { Component } from '@angular/core'
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
    selector: 'map',
    templateUrl: 'map.html'
})

export class MapPage {

    public map: any;
    public marker: any;

    constructor(public platform: Platform, private geolocation: Geolocation) {
        this.platform = platform;
        this.geolocation = geolocation;
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
            this.geolocation.getCurrentPosition(locationOptions).then((resp) => {
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
                    animation: google.maps.Animation.DROP,
                    map: this.map
                };

                // Creation and display marker
                this.marker = new google.maps.Marker(markerOptions);


                var content = '<div id="content" style="color: #000000;">' +
                    '<h1>Color run</h1>'+
                    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut accumsan lacus. Nullam laoreet faucibus'+
                    'urna ut semper. Nullam ut urna sed.</p>'+
                    '</div>';

                let infoWindow = new google.maps.InfoWindow({
                    content: content
                });

                google.maps.event.addListener(this.marker, 'click', () => {
                    infoWindow.open(this.map, this.marker);
                });

            }).catch((error) => {
                console.log('Error getting location', error);
            });
        });
    }
}
