<?php
use \Firebase\JWT\JWT; // declaring class
$jwt_password = $_SERVER['HTTP_JWT_PASSWORD']; // from enviroment variable

function middleware_login($data){
	global $jwt_password;
	$name = (string) isset($data['name']) ? sanitize_str($data['name'],"user_middleware->login : name") :  return_fail('user_middleware->login : name is not defined in requested data');
	$password = (string) isset($data['password']) ? sanitize_str($data['password'],"user_middleware->login : password") :  return_fail('user_middleware->login : password is not defined in requested data');
	if($name != $password ) return_fail("user_middleware->login : username and password does not match");
	$user = array(
		"name"=>$name,
		"password"=>$password,
		"exp"=> time() + (60 * 60)
	);
	$jwt = JWT::encode($user,$jwt_password);
	$user["jwt"] = $jwt;
	$user["password"] = null;
	$user["exp"] = null;
	return_success("user_middleware->login",$user);
}

function middleware_jwt($request_data){
	global $jwt_password;
	$jwt = (string) isset($request_data['jwt']) ? sanitize_str($request_data['jwt'],"request_data->jwt") :  return_fail('jwt is not defined in requested data');
	try{
		$decoded = JWT::decode($jwt, $jwt_password, array('HS256'));
		$decoded_array = (array) $decoded; 
		if($decoded_array['name'] == $decoded_array['password']){
			// pass
		}
		else{
			return_fail("username and password does not match in jwt");
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