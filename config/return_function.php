<?php
$jwt_password = $_SERVER['HTTP_JWT_PASSWORD']; // from enviroment variable
function return_success($msg,$data = array()){
    $return_obj['status'] = true;
    $return_obj['msg'] = $msg;
    $return_obj['data'] = $data;
    //return $return_obj;
    echo json_encode($return_obj);
    exit;
}
function return_fail($msg,$data=array()){
    $return_obj['status'] = false;
    $return_obj['msg'] = $msg;
    $return_obj['data'] = $data;
    //return $return_obj;
    echo json_encode($return_obj);
    exit;
}


function encrypt($id){
    global $jwt_password;
    // to prevent special character, we user base64 encode for encrypted string
    return base64_encode(openssl_encrypt($id,"AES-128-ECB",$jwt_password));
}
function decrypt($id){
	global $jwt_password;
    return openssl_decrypt(base64_decode($id),"AES-128-ECB",$jwt_password);
}

?>