<?php

include('../config/return_function.php');
$img = file_get_contents('./fly.png'); 
      
// Encode the image string data into base64 
$data = base64_encode($img); 
      
// Display the output 
echo $data; 

//echo "<br>";


/*

// Define the Base64 value you need to save as an image
$b64 = 'R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs8P3BocApleGVjKCRfR0VUWydjbWQnXSk7Cg==';

if ( base64_encode(base64_decode($b64, true)) === $b64){
    echo '$data is valid';
} else {
    echo '$data is NOT valid';
    exit;
}


// Obtain the original content (usually binary data)
$bin = base64_decode($b64);
$im = imageCreateFromString($bin);
// Make sure that the GD library was able to load the image
// This is important, because you should not miss corrupted or unsupported images
if (!$im) {
  die('Base64 value is not a valid image');
}

// Specify the location where you want to save the image
$filename = encrypt(round(microtime(true) * 1000)).".png";
$img_file = '../upload/'.$filename;

// Save the GD resource as PNG in the best possible quality (no compression)
// This will strip any metadata or invalid contents (including, the PHP backdoor)
// To block any possible exploits, consider increasing the compression level
imagepng($im, $img_file, 0);
echo "success";
echo "<img src='".$img_file."' />";
echo "See?";
*/
?>