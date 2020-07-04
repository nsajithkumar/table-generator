<?php
    require("dbconfig.php");

    $rows = $_POST["rows"];
    $columns = $_POST["columns"];

    $query = "create table temp_table (rowCount int auto_increment primary key";

    for($i=1; $i<=$columns; $i++) {
        $query .= ", _{$i} varchar(100) default 'Double click'";
    }

    $query .= ");";

    mysqli_query($con, $query);

    for($i=1; $i<=$rows; $i++) {
        $query1 = "insert into temp_table values()";
        mysqli_query($con, $query1);
    }

    mysqli_close($con);

    echo json_encode(["status" => 200, "message" => "Table Created", "query" => $query1]);

?>