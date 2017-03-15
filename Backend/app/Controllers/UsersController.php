<?php
namespace App\Controllers;

use Pragma\Controller\BaseController;
use App\Models\User;

class UsersController extends BaseController{
    public function create(){
      if(!empty($this->params['username']) && !empty($this->params['password'])){
        $u = User::build($this->params);
        $u->save();
        echo $u->;

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
}
?>
