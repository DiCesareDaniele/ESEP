<?php

function dbConn() : mysqli {
	// Create connection
	$conn = new mysqli("localhost", "", "", "my_esepayments");

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}
	
	return $conn;
}

?>