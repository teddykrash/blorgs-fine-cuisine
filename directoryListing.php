<?php
    $files = scandir('./img/');
    //print_r($files);
    $img_listing = array();
    $length = count($files); 
    for ($x = 2; $x < $length; $x++) {
        //$img_listing
        array_push($img_listing, $files[$x]); 
        //echo $files[$x];
    }
    header('Content-type: application/json');
    $json = json_encode($img_listing);
    echo($json);
?>