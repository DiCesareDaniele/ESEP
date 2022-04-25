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

$db = dbConn();

$post = json_decode(file_get_contents("php://input"), true);

$stmt = $db->prepare("SELECT * FROM account WHERE email=?");
$stmt->bind_param("s", $post["email"]);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows) {
    $account = $res->fetch_assoc();
    if (password_verify($post["password"], $account["password"])) {
        $jwt = new JWT();
        $payload = [
            "email" => $post["email"],
            "type" => $account["type"],
            "id" => $account["id"],
            "iss" => "esep.com", 
            "aud" => "esepay.com"
        ];
        if ($account["type"] == "personal") {
            $payload = $payload + ["personal_id" => $account["personal_id"]];
        } else {
            $payload = $payload + ["enterprise_id" => $account["enterprise_id"]];
        }
        $token = $jwt->generate($payload);
        echo json_encode(["token"=>$token]);
    } else {
        echo json_encode(["err"=>"Wrong password"]);
    }
} else {
    echo json_encode(["err"=>"This email is not registered"]);
}

?>