<?php
namespace App\Models;
use Pragma\ORM\Model;

class Event extends Model{
  const TABLENAME='events';

  public function __construct(){
    return parent::__construct(self::TABLENAME);
  }
}

 ?>
