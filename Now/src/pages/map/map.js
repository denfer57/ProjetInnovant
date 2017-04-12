"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var MapPage = (function () {
    function MapPage(platform) {
        this.platform = platform;
        this.platform = platform;
        this.initializeMap();
    }
    MapPage.prototype.initializeMap = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Set location parameters
            var locationOptions = {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 0
            };
            // Get user's position
            ionic_native_1.Geolocation.getCurrentPosition(locationOptions).then(function (resp) {
                var latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
                // Set map parameters
                var mapOptions = {
                    center: latLng,
                    zoom: 18,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                // Creation and display map
                _this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                // Set marker parameters
                var markerOptions = {
                    position: _this.map.getCenter(),
                    animation: google.maps.Animation.DROP,
                    map: _this.map
                };
                // Creation and display marker
                _this.marker = new google.maps.Marker(markerOptions);
                var content = '<div id="content" style="color: #000000;">' +
                    '<h1>Color run</h1>' +
                    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut accumsan lacus. Nullam laoreet faucibus' +
                    'urna ut semper. Nullam ut urna sed.</p>' +
                    '</div>';
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });
                google.maps.event.addListener(_this.marker, 'click', function () {
                    infoWindow.open(_this.map, _this.marker);
                });
            }).catch(function (error) {
                console.log('Error getting location', error);
            });
        });
    };
    MapPage = __decorate([
        core_1.Component({
            selector: 'map',
            templateUrl: 'map.html'
        })
    ], MapPage);
    return MapPage;
}());
exports.MapPage = MapPage;
