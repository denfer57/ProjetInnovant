<?php
require_once '../vendor/autoload.php';// Autoload our dependencies with Composer
require_once '../config/config.php';// config APP

use Pragma\View\View;
use Pragma\Router\Router;
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, PATCH, DELETE');
if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])){
	header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
}

// *** Enable view - uncomment following lines ***

// $view = View::getInstance();
// $view->set_tpl_path(APP_PATH . '/Views/');
// $view->setLayout('path-of-your-application-layout');

$app = Router::getInstance();

/*
Théorie CONVENTION REST
GET /users  --> la liste des utilisateurs
GET /users/:id --> un seul utilisateur dont l'utilisateur est :id
POST /users   ----> création d'un utilisateur en DB
PUT /users/:id ---> modifier un utilisateur en fonction de son id
DELETE /users/:id ---> supprimer l'utilisateur dont l'id est :id
*/

//define your routes here
$app->group('/api', function() use($app){//HOME PAGE
	$app->group('/users', function() use ($app){
		$app->post('', function(){
			(new App\Controllers\UsersController())->create();
		});

		$app->post('/login',function(){
			(new App\Controllers\UsersController())->login();
		});

		$app->post('/logoff',function(){
			(new App\Controllers\UsersController())->logoff();
		});

		$app->get('/get',function(){
			(new App\Controllers\UsersController())->getUser();
		});

	});
	$app->group('/events', function() use ($app){
		$app->post('', function(){
			(new App\Controllers\EventsController())->create();
		});
		$app->post('/delete',function(){
			(new App\Controllers\EventsController())->delete();
		});
		$app->post('/load',function(){
			(new App\Controllers\EventsController())->load();
		});
		$app->post('/update',function(){
			(new App\Controllers\EventsController())->update();
		});

		$app->get('/get',function(){
			(new App\Controllers\EventsController())->getEvents();
		});

	});
});

try{
	$app->run();
	// *** Enable view - uncomment the following line ***

	// $view->compute();
}
catch(Pragma\Router\RouterException $e){
	var_dump($e);
}
