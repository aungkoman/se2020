<?php
$servername = $_SERVER['HTTP_DB_HOST'];
$username = $_SERVER['HTTP_DB_USERNAME'];
$password = $_SERVER['HTTP_DB_PASSWORD'];
$db_name = $_SERVER['HTTP_DB_DBNAME'];
try{
	R::setup( 'mysql:host='.$servername.';dbname='.$db_name.'', $username, $password ); # real db
	R::freeze( TRUE ); // not to change db schema in runtime
}catch(Exception $e){
	echo $e;
}

?>
