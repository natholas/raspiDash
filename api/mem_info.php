<?php
        $raw = explode(": ",shell_exec("free"));

        $numbers = explode("     ",$raw[2]);

        for ($i=0; $i < count($numbers); $i++) {
            $numbers[$i] = intval ($numbers[$i]);
        }

        $mem_info = ["total"=>$numbers[0] + $numbers[1],"used"=>$numbers[0],"free"=>$numbers[1]];

        echo json_encode($mem_info);


?>
