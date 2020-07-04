<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST');
    header('Content-Type: application/json');
    $con = mysqli_connect("localhost", "root", "", "table_generator");
    if(!$con) {
        die("connection Failed");
    }

?>