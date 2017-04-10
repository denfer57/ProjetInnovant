import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from '@angular/http';
import { ToastController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

var latitude, longitude;
var img;
// A changer selon l'IP pour le téléphone
//192.168.43.215 ou
//ionicserver
var IP = '192.168.43.215';
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
	
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, toastCtrl: ToastController, private transfer: Transfer,private camera: Camera) {
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
  
  
  //prendre une photo et l'uploader
  public upload()
  {
	//sourceType 0 = librarie, 1 = prendre une photo
    let options = {
		quality: 100,
		sourceType: 0
    };
	var uniqID = (new Date()).getTime();
    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
	
		const fileTransfer: TransferObject = this.transfer.create();
		  let options1: FileUploadOptions = {
			 fileKey: 'file',
			 fileName: 'event'+uniqID+'.jpg',
			 headers: {}
		}
		img = options1.fileName;
		fileTransfer.upload(imageData, 'http://'+IP+'/ProjetInnovant/server/app/Controllers/Upload.php', options1)
		.then((data) => {
			// success
			alert("Your picture has been upload");
		}, (err) => {
			// error
			alert("error"+JSON.stringify(err));
		});
    });
	return img;
  }
  

  public submit(){
	var token = window.localStorage.getItem('token');
	
    var link = 'http://'+IP+':8888/api/events';
    this.http.post(link, {img, latitude, longitude, token, name : this.data.name, categorie : this.data.categorie, description : this.data.description} ).subscribe(function (res){
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
