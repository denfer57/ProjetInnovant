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

      if(empty($this->params['img'])){
        $img = 'Party_Dream_Color_party.jpg';
      }
      else 
      {
        $img = $this->params['img'];
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
      /*
      Voir pourquoi le delete marche pas, à cause de l'user_id ?
      $token = "58dabf6db7c0e";
      $u = User::forge()->where("token", "=", $token)->first();
      $e = Event::forge()->where("user_id", "=", $u->id)->all();
      $e->delete();
      */
    }

    public function load(){
      //$e = Event::forge()->select();
    }

    public function update(){
      /*
      Voir comment les update fonctionne avec Pragma
      */
    }

    public function getEvents(){
      $events = Event::forge()->where("city", "=", $this->params['city'])->get_arrays();
      echo json_encode($events);
    }
}
?>