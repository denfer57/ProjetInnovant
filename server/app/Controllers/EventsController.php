<?php
namespace App\Controllers;

use Pragma\Controller\BaseController;
use App\Models\Event;
use App\Models\User;

class EventsController extends BaseController{
    public function create(){
      $eventOK=true;
      $imageOK=true;
      $erreur="";
      $img = "";
      $token = $this->params["token"];
      $u = User::forge()->where("token", "=", $token)->first();
      //Si l'utilisateur n'a pas mis de photo, on en met une par défaut
      if(empty($this->params['img'])){
        $img = 'Party_Dream_Color_party.jpg';
      }
      else 
      {
        $img = $this->params['img'];
      }

      //Si la ville n'a pas été trouvée, on l'a met a undefined
      if(empty($this->params['city'])){
        $city = 'undefined';
      }
      else 
      {
        $city = $this->params["city"];
      }

      if(empty($this->params['name'])){
        $erreur.= "Please enter a name for your event. <br>";
        $eventOK=false;
      }

      if(empty($this->params['categorie'])){
        $erreur.="Please select a categorie for your event. <br>";
        $eventOK=false;
      }

      if(empty($this->params['description'])){
        $erreur.="Please enter a description for your event. <br>";
        $eventOK=false;
      }

      if ($eventOK) {
        $e = Event::build([
            'city' => $city,
            'picture' => $img,
            'latitude' => $this->params["latitude"],
            'longitude' => $this->params["longitude"],
            'user_id' => $u->id,
            'name' => $this->params["name"],
            'categorie' => $this->params["categorie"],
            'description' => $this->params["description"]
        ]);
        $e->save();
        
        echo json_encode(array('token'=>$token,'name'=>$this->params["name"],'categorie'=>$this->params["categorie"], 'description'=>$this->params["description"]));
      }
      else{
        echo json_encode(array('erreur'=>$erreur));
      }
    }

    public function delete(){
      
    }

    public function update(){
      
    }

    public function getEvents(){
      $events = Event::forge()->where("city", "=", $this->params['city'])->get_arrays();
      echo json_encode($events);
    }
}
?>