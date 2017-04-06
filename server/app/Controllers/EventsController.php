<?php
namespace App\Controllers;

use Pragma\Controller\BaseController;
use App\Models\Event;
use App\Models\User;
//header('Access-Control-Allow-Origin: *');

class EventsController extends BaseController{
    /*public function upload($index,$destination,$maxsize=FALSE,$extensions=FALSE)
    {
      //Test1: fichier correctement uploadé
      if (!isset($_FILES[$index]) OR $_FILES[$index]['error'] > 0) return FALSE;
      //Test2: taille limite
      if ($maxsize !== FALSE AND $_FILES[$index]['size'] > $maxsize) return FALSE;
      //Test3: extension
      $ext = substr(strrchr($_FILES[$index]['name'],'.'),1);
      if ($extensions !== FALSE AND !in_array($ext,$extensions)) return FALSE;
      //Déplacement
      return move_uploaded_file($_FILES[$index]['tmp_name'],$destination);
    }*/

    public function create(){
      $eventOK=true;
      $imageOK=true;
      $erreur="";
      $token = $this->params["token"];
      $u = User::forge()->where("token", "=", $token)->first();

      /*Base64.decode64(image_data[:content]);
      $target_path = "uploads/";
      $target_path .= $target_path . basename( $_FILES['file']['name']);

      if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
        echo "Upload and move success";
      } else {
        echo $target_path;
        echo "There was an error uploading the file, please try again!";
      }*/

      //Récupère les infos de l'image
      //$nomFichierBase = $_FILES["photo"]["name"];
      //$nomFichierTemp = $_FILES["photo"]["tmp_name"];
      //$typeFichier = pathinfo($nomFichierBase, PATHINFO_EXTENSION);
      //$id = uniqid();
      //$upload = upload('photo','Images/event_$id',1048576, array('png','gif','jpg','jpeg') );

      /*if(empty($_POST['photo'])){
        $erreur.="There is no picture. <br>";
      }*/
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
            //'picture' => $nomFichierFinal,
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
}
?>