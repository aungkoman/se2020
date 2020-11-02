<?php
$string_to_encrypt="Test";
$password="password";

$encrypted_string=openssl_encrypt($string_to_encrypt,"AES-128-ECB",$password);
echo "encrypted_string ".$encrypted_string."<br>";

$decrypted_string=openssl_decrypt($encrypted_string,"AES-128-ECB",$password);
echo "decrypted_string ".$decrypted_string."<br>";

for($i=0; $i < 10; $i++){
    echo "original int ".$i."<br>";
    $encrypted_string=openssl_encrypt($i,"AES-128-ECB",$password);
    echo "encrypted_string ".$encrypted_string."<br>";

    $decrypted_string=openssl_decrypt($encrypted_string,"AES-128-ECB",$password);
    echo "decrypted_string ".$decrypted_string."<br>";
}
?>