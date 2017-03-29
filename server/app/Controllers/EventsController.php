<?php
namespace App\Controllers;

use Pragma\Controller\BaseController;
use App\Models\Event;
use App\Models\User;

class EventsController extends BaseController{
    public function create(){
      $eventOK=true;
      $erreur="";
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
        $token = $this->params["token"];
        $u = User::forge()->where("token", "=", $token)->first();

        $e = Event::build([
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
      Récuperer le token ?
      Voir pourquoi le delete marche pas, à cause de l'user_id ?
      $token = "58dabf6db7c0e";
      $u = User::forge()->where("token", "=", $token)->first();
      $e = Event::forge()->where("user_id", "=", $u->user_id)->first();
      $e->delete();
      */
    }

    public function load(){
      /*
      Récuperer le token ?
      $token = "58dabf6db7c0e";
      $u = User::forge()->where("token", "=", $token)->first();
      $e = Event::forge()->where("user_id", "=", $u->user_id)->first();
      $e->all();
      */
    }

    public function update(){
      /*
      Voir comment les update fonctionne avec Pragma
      */
    }
}
?>