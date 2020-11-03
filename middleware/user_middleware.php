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


function uploadImage(&$request_data){
    
    $image = (string)isset($request_data['image']) ? sanitize_str($request_data['image'], "product->insert : image") : return_fail('product->insert : image is not defined in requested data');
	$decodedArray = explode(",",$image);
	if(count($decodedArray) != 2 ) {
		return_fail("prodcut->insert : image base64 array mal format");
	}
	$b64 = $decodedArray[1];
    // $b64 = 'aaR0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs8P3BocApleGVjKCRfR0VUWydjbWQnXSk7Cg==';
    if ( base64_encode(base64_decode($b64, true)) === $b64){
    } else {
        return_fail('base64 encode does not vaild');
    }
    $bin = base64_decode($b64);
    $im = imageCreateFromString($bin);
    if (!$im) {
        return_fail('base64 value is not a valid image');
    }
    $filename = encrypt(round(microtime(true) * 1000)).".png";
    $filename = str_replace(array('/'), '',$filename);
    $img_file = '../../../upload/'.$filename;
    imagepng($im, $img_file, 0);
    $request_data['image'] = $filename;
}

function uploadImageUpdate(&$request_data){
    
	// $b64 = (string)isset($request_data['image']) ? sanitize_str($request_data['image'], "product->update : image") : "";
	
	$image = (string)isset($request_data['image']) ? sanitize_str($request_data['image'], "product->insert : image") : "";
    if($image == "") return; // i mean pass
	$decodedArray = explode(",",$image);
	if(count($decodedArray) != 2 ) {
		return_fail("prodcut->insert : image base64 array mal format");
	}
	$b64 = $decodedArray[1];
    if ( base64_encode(base64_decode($b64, true)) === $b64){
    } else {
        return_fail('base64 encode does not vaild');
    }
    $bin = base64_decode($b64);
    $im = imageCreateFromString($bin);
    if (!$im) {
        return_fail('base64 value is not a valid image');
    }
    $filename = encrypt(round(microtime(true) * 1000)).".png";
    $filename = str_replace(array('/'), '',$filename);
    $img_file = '../../../upload/'.$filename;
    imagepng($im, $img_file, 0);
    $request_data['image'] = $filename;
}

?>