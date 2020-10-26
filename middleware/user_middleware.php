<?php
use \Firebase\JWT\JWT; // declaring class
$jwt_password = $_SERVER['HTTP_JWT_PASSWORD']; // from enviroment variable

function middleware_login2($data){
	global $jwt_password;
	//  1. name 
	$name = (string) isset($data['name']) ? sanitize_str($data['name'],"user_middleware->login : name") :  return_fail('user_middleware->login : name is not defined in requested data');
	//  1. password 
	$password = (string) isset($data['password']) ? sanitize_str($data['password'],"user_middleware->login : password") :  return_fail('user_middleware->login : password is not defined in requested data');
	$users = R::find('user', ' name = ? AND password = ?', [ $name, $password ] );
	if(count($users) == 0 ) return_fail("user_middleware->login : username and password does not match");
	$return_data = array();
    foreach($users AS $index=>$user){
        $return_data[] = $user;
	}
	$user = $return_data[0];
	$user->password = null;
	//$user->exp = 1523798257; // expire time in milisecond
	// TDL 
	/*
		Generate JWT and set to user data
	*/
	$jwt = JWT::encode($user,$jwt_password);
	$user->jwt = $jwt;
	return_success("user_middleware->login",$user);
}
function middleware_login($data){
	global $jwt_password;
	//  1. name 
	$name = (string) isset($data['name']) ? sanitize_str($data['name'],"user_middleware->login : name") :  return_fail('user_middleware->login : name is not defined in requested data');
	//  1. password 
	$password = (string) isset($data['password']) ? sanitize_str($data['password'],"user_middleware->login : password") :  return_fail('user_middleware->login : password is not defined in requested data');
	$users = R::find('user', ' name = ?', [ $name ] );
	if(count($users) == 0 ) return_fail("user_middleware->login : username is not found in our system");
	$return_data = array();
    foreach($users AS $index=>$user){
        $return_data[] = $user;
	}
	$user = $return_data[0];
	if(password_verify($password,$user->password)){
		$user->password = null;
		//$user->exp = 1523798257; // expire time in milisecond
		// TDL 
		/*
			Generate JWT and set to user data
		*/
		$jwt = JWT::encode($user,$jwt_password);
		$user->jwt = $jwt;
		$user->password = null;
		return_success("user_middleware->login",$user);
	}else{
		return_fail("user_middleware->login : username and password does not match");
	}
	
}
function middleware_user($request_data){

}
function middleware_admin($request_data){
	
}
function middleware_user2($request_data){
	global $jwt_password;
	$jwt = (string) isset($request_data['jwt']) ? sanitize_str($request_data['jwt'],"request_data->jwt") :  return_fail('jwt is not defined in requested data');
	try{
		$decoded = JWT::decode($jwt, $jwt_password, array('HS256'));
		$decoded_array = (array) $decoded; 
		if($decoded_array['role'] == "user"){
			// pass
		}
		else if($decoded_array['role'] == "admin"){
			// pass
		}
		else{
			return_fail("insufficient_role : You don't have sufficient role for requested resources ",$decoded_array['role']);
		}
	}catch(\Exception $e){
		$str = 'Caught exception in JWT::decode : '.  $e->getMessage(). "\n";
		return_fail("invalid_jwt",$str);
	}
}
function middleware_admin2($request_data){
	global $jwt_password;
	$jwt = (string) isset($request_data['jwt']) ? sanitize_str($request_data['jwt'],"request_data->jwt") :  return_fail('jwt is not defined in requested data');
	try{
		$decoded = JWT::decode($jwt, $jwt_password, array('HS256'));
		$decoded_array = (array) $decoded; 
		if($decoded_array['role'] == "admin"){
			// pass
		}
		else{
			return_fail("insufficient_role : You don't have sufficient role for requested resources ",$decoded_array['role']);
		}
	}catch(\Exception $e){
		$str = 'Caught exception in JWT::decode : '.  $e->getMessage(). "\n";
		return_fail("invalid_jwt",$str);
	}
}

?>