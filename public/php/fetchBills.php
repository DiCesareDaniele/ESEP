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
    if ($payload["type"] == "personal") {
        $stmt = $db->prepare("SELECT b.*, m.utility as utility FROM bill b 
                                JOIN contract c ON c.id = b.id_contract 
                                JOIN meter m ON m.id = c.id_meter
                                JOIN site s ON m.id_site = s.id WHERE s.personal_id=?");
        $stmt->bind_param("i", $payload["personal_id"]);
    } else {
        $stmt = $db->prepare("SELECT b.*, m.utility as utility FROM bill b 
                                JOIN contract c ON c.id = b.id_contract 
                                JOIN meter m ON m.id = c.id_meter
                                JOIN site s ON m.id_site = s.id WHERE s.enterprise_id=?");
        $stmt->bind_param("i", $payload["enterprise_id"]);
    }
    $stmt->execute();
    $res = $stmt->get_result();
    echo json_encode($res->fetch_all(MYSQLI_ASSOC));
} else {
    echo json_encode(["err"=>"Invalid token"]);
}


?>