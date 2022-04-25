<?php
// request
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
// response
header("Content-type: application/json");

include_once("dbConn.php");

$db = dbConn();

$post = json_decode(file_get_contents("php://input"), true);

$stmt = $db->prepare("SELECT * FROM account WHERE email=?");
$stmt->bind_param("s", $post["email"]);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows) {
    
} else {
    echo json_encode(["err"=>"This email is not registered"]);
}

?>