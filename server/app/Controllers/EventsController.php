<?php
namespace App\Controllers;

use Pragma\Controller\BaseController;
use App\Models\Event;

class EventsController extends BaseController{
    public function create(){
      $eventOK=true;
      $erreur="";
      if(!empty($this->params['name']) && !empty($this->params['address']) && !empty($this->params['description']) && !empty($this->params['categorie_id'])){
        $eventOK=false;
      }
      else {
        $eventOK=false;
        $erreur="Are fields are not completed. <br>"
      }
      if ($eventOK) {
        $token = uniqid();
        $e = Event::build([
            'name' => $this->params["name"],
            'address' => $this->params["address"],
            'description' => $this->params["description"],
            'categorie_id' => $this->params["categorie_id"],
            'token' => $token
            ]);
          $e->save();
          echo json_encode(array('token'=>$token,'name'=>$this->params["name"],'address'=>$this->params["address"]), 'description'=>$this->params["description"], 'categorie_id'=>$this->params["categorie_id"]);
        }else{
          echo json_encode(array('erreur'=>$erreur));
        }

    }

    public function delete(){
      
    }

    public function update(){

    }
}
?>
