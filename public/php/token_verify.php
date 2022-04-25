<?php
// request
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
// response
header("Content-type: application/json");

include_once("jwt.php");

$post = json_decode(file_get_contents("php://input"), true);

$jwt = new JWT();

if ($jwt->is_expired($post["token"])) {
    echo json_encode(["is_expired" => true]);
} else if ($jwt->is_valid($post["token"])) {
    echo json_encode(["is_valid" => true]);
} else {
    echo json_encode(["is_valid" => false]);
}

?>