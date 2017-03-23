<?php
define('DB_CONNECTOR', 'mysql'); // Possible values: mysq, sqlite
define('DB_HOST', 'localhost');
define('DB_NAME', 'test'); // sqlite: used as file path
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');

define( 'APP_PATH', realpath('..') . '/app' );

//AuthSession params
define('AUTH_USER_MODEL', 'APP\\Models\\User');
//define('AUTH_CRYPTO_COST', 10);
