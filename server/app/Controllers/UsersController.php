<?php
namespace App\Controllers;

use Pragma\Controller\BaseController;
use App\Models\User;

class UsersController extends BaseController{
    public function create(){
      if(!empty($this->params['username']) && !empty($this->params['password'])){
        $u = User::build($this->params);
        $u->save();
        echo $u->toJSON();

        // $u = User::find(3);

        // $rs = $db->query('SELECT * FROM users');
        // $users = [];
        // while($fields = $db->fetchrow($rs))){
        //   $u = new User();
        //   $u->openWithFields($fields);
        //   $users[] = $u;
        // }
      }
    }

    public function login(){
      if(!empty($this->params['username']) && !empty($this->params['password'])){
        //var_dump($this->params);
        $u = User::forge()->where("username", "=", $this->params['username'])->first();

        if(isset($u)){
          //echo $u->toJSON();
          if($u->password == $this->params['password']){
            //echo json_encode("id valide");
            //echo $u->toJSON();
            $token = uniqid();
            //echo json_encode($token);
            echo json_encode(array('username'=>$this->params['username'],'token'=>$token));
            //echo array("username"=>$this->params['username'],"token"=>$token)->toJSON();
          }else{
            echo json_encode(array("erreur" =>" The login credentials are invalid."));
            //echo "test";
          }
        }else{
          echo json_encode(array("erreur" =>" The login credentials are invalid."));
        }
    }else{
      echo json_encode(array("erreur" =>" All fields are not completed."));
    }
  }
}
?>
