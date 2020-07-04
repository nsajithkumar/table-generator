<?php
    require("dbconfig.php");

    $id = $_POST["id"];
    $name = $_POST["name"];
    $city = $_POST["city"];
    $mobileNumber = $_POST["mobileNumber"];

    $query = "insert into info values ('{$id}', '{$name}', '{$city}', '{$mobileNumber}')";
    $res = mysqli_query($con, $query);

    if($res) {
        echo json_encode(["status" => 200, "message" => "Inserted Succesfully"]);
    } else {
        echo json_encode(["status" => 500, "message" => "Not Inserted", "error" => mysqli_error($con)]);
    }

    mysqli_close($con);

?>