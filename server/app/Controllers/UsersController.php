<?php
namespace App\Controllers;

use Pragma\Controller\BaseController;
use App\Models\User;

class UsersController extends BaseController{
    public function create(){
      $registrationOK=true;
      $erreur="";
      if(!empty($this->params['username']) && !empty($this->params['password']) && !empty($this->params['email'])){
        $exist=User::forge()->where("username","=",$this->params['username'])->first();
        if(!empty($exist)){
                $erreur ="Your username is already taken. <br>";
                $registrationOK=false;
          }
          if(isset($this->params["password"])){
            if(strlen($this->params["password"])<8){
                $erreur.="Your password is too short.<br>";
                $registrationOK=false;
            }
        }
        if(isset($this->params["password"]) AND isset($this->params["confirmpassword"])){
            if($this->params["password"]!=$this->params["confirmpassword"]){
                $erreur.="Your password & confirmation password are not the same.<br>";
                $registrationOK=false;
            }
        }
          if(isset($this->params["email"])){
            if(!strstr($this->params["email"],"@")){
                $erreur.="Your email is not valid.<br>";
                $registrationOK=false;
            }
            if(!strstr($this->params["email"],".")){
                $erreur.="Your email is not valid.<br>";
                $registrationOK=false;
            }
        }
      }else{
        $registrationOK=false;
        $erreur="All fields are not completed. <br>";
      }
        if ($registrationOK) {
          $salt = strval(rand(0, 9999999999999999));
          $pwd = hash('sha256', $this->params["password"].$salt);
          $token = uniqid();
          $u = User::build([
            'username' => $this->params["username"],
            'password' => $pwd,
            'salt' => $salt,
            'email' => $this->params["email"],
            'token' => $token
            ]);
          $u->save();
          echo json_encode(array('token'=>$token,'username'=>$this->params["username"],'email'=>$this->params["email"]));
        }else{
          echo json_encode(array('erreur'=>$erreur));
        }
    }
    public function login(){
      if(!empty($this->params['username']) && !empty($this->params['password'])){
        //var_dump($this->params);
        $u = User::forge()->where("username", "=", $this->params['username'])->first();
        if(isset($u)){
          //echo $u->toJSON();
          $pwd = hash('sha256', $this->params["password"].$u->salt);
          if($u->password == $pwd){
            //echo json_encode("id valide");
            //echo $u->toJSON();
            $token = uniqid();
            //echo json_encode($token);
            echo json_encode(array('username'=>$this->params['username'],'token'=>$token));
            //echo array("username"=>$this->params['username'],"token"=>$token)->toJSON();
          }else{
            echo json_encode(array('erreur' =>'The login credentials are invalid.'));
            //echo json_encode(array('erreur' =>$pwd));
            //echo "test";
          }
        }else{
          echo json_encode(array('erreur' =>'The login credentials are invalid.'));
        }
    }else{
      echo json_encode(array('erreur' =>'All fields are not completed.'));
    }
  }
}
?>