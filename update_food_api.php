<?php 
require_once("./connect_pdo.php");
$jsonData = file_get_contents('php://input');

if (empty($jsonData)) {
    http_response_code(400);
    die("No JSON data received.");
}

$data = json_decode($jsonData, true);

$food_id       = $data['food_id'];
$food_name     = $data['food_name'];
$price         = $data['price'];
$calories      = $data['calories'];
$food_cat      = $data['food_cat'];
$desc          = $data['desc'];
$is_combo      = $data['is_combo'];
$combo_price   = $data['combo_price'];
$food_quantity = $data['food_quantity'];
$food_image = $data['food_image'];

$query = "UPDATE menu 
SET food_name = '$food_name', 
price = '$price', 
calories = '$calories', 
food_cat = '$food_cat', 
`desc` = '$desc', 
is_combo = '$is_combo', 
combo_price = '$combo_price', 
food_quantity = '$food_quantity',
food_image = '$food_image'
WHERE menu.food_id = '$food_id';

$stmt = $dbo->query($query);
echo json_encode(['status' => 'success', 'message' => "$query"]);
?>