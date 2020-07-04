<?php
    require("dbconfig.php");

    $query = "show tables";
    $res = mysqli_query($con, $query);

    if($res) {

        if(mysqli_num_rows($res) > 1) {

            $query1 = "select * from temp_table";
            $res1 = mysqli_query($con, $query1);
    
            mysqli_close($con);
    
            if($res1){
                $rows = array();
                while($row = mysqli_fetch_row($res1)) {
                    $temp = array();
                    array_push($rows, $row);
                }
                echo json_encode(["status" => 200, "message" => "Fetched Successfully", "rows" => $rows]);
            } else {
                echo json_encode(["status" => 500, "message" => "DB Error"]);
            }
    
        } else {
            mysqli_close($con);
            echo json_encode(["status" => 404, "message" => "No Tables Present"]);
        }   

    } else {
        mysqli_close($con);
        echo json_encode(["status" => 500, "message" => "DB Error"]);
    }

?>