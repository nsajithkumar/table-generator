<?php
    require("dbconfig.php");

    $row = $_POST["row"];
    $column = "_".$_POST["column"];
    $value = $_POST["value"];

    $query = "update temp_table set {$column} = '{$value}' where rowCount = '{$row}'";
    $res = mysqli_query($con, $query);

    if($res) {
        mysqli_close($con);
        echo json_encode(["status" => 200, "message" => "Updated"]);
    } else {
        mysqli_close($con);
        echo json_encode(["status" => 500, "message" => "Not Updated"]);
    }
    
?>