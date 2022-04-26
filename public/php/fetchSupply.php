<?php
// request
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
// response
header("Content-type: application/json");

include_once("dbConn.php");
include_once("jwt.php");

$post = json_decode(file_get_contents("php://input"), true);

$db = dbConn();

$jwt = new JWT();
if ($jwt->is_valid($post["token"])) {
    $payload = $jwt->get_payload_as_json($post["token"]);
    $stmt = $db->prepare("SELECT s.* FROM contract c JOIN supply s ON c.id_supply = s.id WHERE c.id = ?");
    $stmt->bind_param("i", $post["id"]);
    $stmt->execute();
    $res = $stmt->get_result();
    echo json_encode($res->fetch_assoc());
} else {
    echo json_encode(["err"=>"Invalid token"]);
}

?>