<?php

    $data = ["temp"=>shell_exec("cat /sys/class/thermal/thermal_zone0/temp")];

    echo json_encode($data);

?>
