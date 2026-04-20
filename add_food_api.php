<?php 
require_once("./connect_pdo.php");

$jsonData = file_get_contents('php://input');

// Check if data was received (optional but recommended)
if (empty($jsonData)) {
    http_response_code(400); // Bad Request
    die("No JSON data received.");
}
// Decode the JSON string into a PHP object or associative array
$data = json_decode($jsonData, true); // true for associative array

// Access the data

$food_name = $data['food_name'];
$price = $data['price'];
$calories = $data['calories'];
$food_cat = $data['food_cat'];
$desc = $data['desc'];
$is_combo = $data['is_combo'];
$combo_price = $data['combo_price'];
$food_quantity = $data['food_quantity'];
$food_image = $data['food_image'];


$query = "INSERT INTO menu (food_id, food_name, price, calories, food_cat, `desc`, is_combo, combo_price, food_quantity, food_image) VALUES (NULL, '$food_name', '$price', '$calories', '$food_cat', '$desc', '$is_combo', '$combo_price', '$food_quantity', '$food_image')";

$stmt = $dbo->query($query);

echo json_encode(['status' => 'success', 'message' => "$query"]);
?>