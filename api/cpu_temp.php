<?php

    $data = ["cpu_temp"=>shell_exec("cat /sys/class/thermal/thermal_zone0/temp")];
    //$data = ["cpu_temp"=>1251];

    echo json_encode($data);

?>
