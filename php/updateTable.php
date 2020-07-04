<?php
    require("dbconfig.php");

    $row = $_POST["row"];
    $column = "_".$_POST["column"];
    $value = $_POST["value"];

    $query = "update temp_table set {$column} = '{$value}' where rowCount = '{$row}'";
    $res = mysqli_query($con, $query);

    if($res) {
        echo json_encode(["status" => 200, "message" => "Updated"]);
    } else {
        echo json_encode(["status" => 500, "message" => "Not Updated"]);
    }

    mysqli_close($con);
    
?>