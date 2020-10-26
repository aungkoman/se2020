<?php
// text santitize
function sanitize_str($data,$msg = "message"){
    $data = filter_var($data, FILTER_SANITIZE_STRING);
    if($data == "" ) return_fail("bad string!",$msg);
    return $data;
}

function sanitize_int($data,$msg = "message"){
    $data = filter_var($data, FILTER_SANITIZE_NUMBER_INT);
    if($data == "" ) return_fail("bad int!",$msg);
    $data = (int) $data; // int casting , i don't know why theose casting in model section does not work.
    return $data;
}

function sanitize_float($data,$msg = "message"){
    //echo "sanitize_float is ".$data;
    //$data = filter_var($data, FILTER_VALIDATE_FLOAT);
    //$data = filter_var($data, FILTER_SANITIZE_NUMBER_INT);
    //if($data == "" ) return_fail("bad float",$msg);
    //echo "final float is ".$data;
    /*
        TD:
        1. real sanitize float
    */
    return $data;
}



?>