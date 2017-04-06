import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
/*import { Camera } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';*/

var latitude, longitude;
/*
  Generated class for the EventForm page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-event-form',
  templateUrl: 'event-form.html'
})
export class EventFormPage {
	
	data:any;
	//base64Image:string;
	//toto: string;
	
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, toastCtrl: ToastController/*, private transfer: Transfer,private camera: Camera*/) {
    this.data = {};
	this.recupererLatLng();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventFormPage');
  }
  
  public recupererLatLng(){
	let locationOptions = {
			enableHighAccuracy: true,
			timeout: 20000,
			maximumAge: 0
	};

	// Get user's position
	Geolocation.getCurrentPosition(locationOptions).then((resp) => {
		latitude = resp.coords.latitude;
		longitude = resp.coords.longitude;
	}).catch((error) => {
				console.log('Error getting location', error);
	});
	return latitude, longitude;
  }
  
  /*public recupererAdresse(latitude,longitude){
	si on a le temps, récupérer le formatted address en JSON
	this.http.get(https://maps.googleapis.com/maps/api/geocode/json?latlng=latitude,longitude); 
  }*/
  
  /*prendre une photo et l'uploader
  upload()
  {
    let options = {
		quality: 100
    };
	
    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
	
		const fileTransfer: TransferObject = this.transfer.create();
		  let options1: FileUploadOptions = {
			 fileKey: 'file',
			 fileName: 'name.jpg',
			 headers: {}
		}
		fileTransfer.upload(imageData, 'http://ionicserver:8888/ProjetInnovant/server/app/Controllers/Events-Controller.php', options1)
		.then((data) => {
			// success
			alert("success");
		}, (err) => {
			// error
			alert("error"+JSON.stringify(err));
		});
    });
  }*/
  
  /*upload(){

  this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType     : this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE
  }).then((imageData) => {
    // imageData is a base64 encoded string
	this.toto = imageData;
	this.base64Image = "data:image/jpeg;base64," + imageData; //this.toto;
	console.log("Ok");
  }, (err) => {
      console.log(err);
  });
  }*/

  public submit(){
	var token = window.localStorage.getItem('token');
    var link = 'http://ionicserver:8888/api/events';
	//console.log(latitude);
	
	//this.recupererAdresse();
    this.http.post(link, {latitude, longitude, token, name : this.data.name, categorie : this.data.categorie, description : this.data.description} ).subscribe(function (res){
      if(JSON.parse(res["_body"]).erreur==null){
        console.log("pas d'erreur");
        document.getElementById("rep").innerHTML="The event "+JSON.parse(res["_body"]).name+" has been registered";
      }else{
        console.log(JSON.parse(res["_body"]).erreur);
        document.getElementById("rep").innerHTML=JSON.parse(res["_body"]).erreur;
      }
    });
   }
   
   public checkLength(len, text) {
     var fieldLength = text.value.length;
     if (fieldLength <= len) {
       return true;
     }
     else {
       var str = text.value;
       str = str.substring(0, str.length - 1);
       text.value = str;
    }
   }
}
