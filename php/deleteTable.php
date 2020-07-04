<?php
    require("dbconfig.php");

    $query = "drop table temp_table";
    $query1 = "truncate table info";

    $res = mysqli_query($con, $query);
    $res1 = mysqli_query($con, $query1);

    mysqli_close($con);
    
    if($res && $res1) {
        echo json_encode(["status" => 200, "message" => "Table Deleted"]);
    } else {
        echo json_encode(["status" => 500, "message" => "Table Not Deleted"]);
    }
?>