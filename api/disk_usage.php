<?php
	$lines = explode("\n", shell_exec("df /dev/sda1"));
	$numbers = explode("%", explode("      ", $lines[1])[1])[0];
	$numbers = explode(" ", $numbers);
	unset($numbers[4]);
	$numbers = array_values($numbers);
	$data = ["total"=>$numbers[0], "used"=>$numbers[1], "free"=>$numbers[2]];
	echo json_encode($data);
?>
