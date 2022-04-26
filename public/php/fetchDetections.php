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
    $raw = "SELECT d.*, m.utility as utility, s.site as site FROM detections d 
                                JOIN meter m ON m.id = d.id_meter 
                                JOIN site s ON m.id_site = s.id WHERE";
    if ($payload["type"] == "personal") {
        $id = $payload["personal_id"];
        $raw = $raw." personal_id = ?";
    } else {
        $id = $payload["enterprise_id"];
        $raw = $raw." enterprise_id = ?";
    }
    if ($post["filter"]) {
        if (isset($post["filter"]["site"])) {
            $raw = $raw." AND s.site = ?";
        }
        if (isset($post["filter"]["meter"])) {
            $raw = $raw." AND m.id = ?";
        }
        if (isset($post["filter"]["utility"])) {
            if ($post["filter"]["utility"] == 1) {
                $raw = $raw." AND m.utility = 'EE'";
            } else if ($post["filter"]["utility"] == 2) {
                $raw = $raw." AND m.utility = 'GAS'";
            }
        }
    }
    $stmt = $db->prepare($raw);
    if (isset($post["filter"]["site"]) && isset($post["filter"]["meter"])) {
            $stmt->bind_param("isi", $id, $post["filter"]["site"], $post["filter"]["meter"]);
        } else if (isset($post["filter"]["site"])) {
            $stmt->bind_param("is", $id, $post["filter"]["site"]);
        } else if (isset($post["filter"]["meter"])) {
            $stmt->bind_param("ii", $id, $post["filter"]["meter"]);
        } else {
            $stmt->bind_param("i", $id);
        }
    $stmt->execute();
    $res = $stmt->get_result();
    echo json_encode($res->fetch_all(MYSQLI_ASSOC));
} else {
    echo json_encode(["err"=>"Invalid token"]);
}


?>