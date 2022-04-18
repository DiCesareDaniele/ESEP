<?php

function dbConn(string $user) : PDO {
	
	$config = json_decode(file_get_contents(dirname(__DIR__).'/config.json'), true);
	
	$db_data = $config["database"];
	$db_host = $db_data["host"];
	$db_port = $db_data["port"];
	$db_name = $db_data["name"];
	$db_psw = $db_data["user_passwords"][$user];

	$db_options = [
	  PDO::ATTR_EMULATE_PREPARES   => false, // turn off emulation mode for "real" prepared statements
	  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, //turn on errors in the form of exceptions
	  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //make the default fetch be an associative array
	];

	try {
		$db = new PDO("mysql:host=$db_host;port=$db_port;dbname=$db_name", $user, $db_psw, $db_options);
	} catch(PDOException $exception){
		exit("Connection error: " . $exception->getMessage());
	}
	
	return $db;
}

?>