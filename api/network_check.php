<?php

$raw = shell_exec("cat /proc/net/dev");
$numbers = explode("\n",$raw)[2];
$numbers = explode(": ",$numbers)[1];
$numbers = explode(" ",$numbers)[0];

echo json_encode(["bytes"=>$numbers]);
