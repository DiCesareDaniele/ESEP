<?php

function dbConn() : mysqli {
	// Create connection

	$config = json_decode(file_get_contents("../config.json"), true);
	$db = $config["db"];
	$conn = new mysqli($db["host"], $db["user"], $db["password"], $db["database"]);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	
	return $conn;
}

?>