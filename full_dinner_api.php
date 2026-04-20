<?php
require_once("../connect_pdo.php");
$output = array();

// Regular dinner items >= 4.50
$dinner = array();
$query = "SELECT * 
FROM menu 
WHERE food_cat = 'dinner' 
AND price >= 4.50 
AND food_quantity > 0 
ORDER BY food_name";
foreach ($dbo->query($query) as $row) {
    $dinner[] = array(
        "food_id"       => stripslashes($row["food_id"]),
        "food_name"     => stripslashes($row["food_name"]),
        "price"         => stripslashes($row["price"]),
        "calories"      => stripslashes($row["calories"]),
        "food_cat"      => stripslashes($row["food_cat"]),
        "desc"          => stripslashes($row["desc"]),
        "is_combo"      => stripslashes($row["is_combo"]),
        "combo_price"   => stripslashes($row["combo_price"]),
        "food_quantity" => stripslashes($row["food_quantity"]),
        "food_image"    =>stripslashes($row["food_image"])
    );
}
$output["dinner"] = $dinner;

// Value dinner items < 4.50
$valuedinner = array();
$query = "SELECT * 
FROM menu 
WHERE food_cat = 'dinner' 
AND price < 4.50 
AND food_quantity > 0 
ORDER BY food_name";
foreach ($dbo->query($query) as $row) {
    $valuedinner[] = array(
        "food_id"       => stripslashes($row["food_id"]),
        "food_name"     => stripslashes($row["food_name"]),
        "price"         => stripslashes($row["price"]),
        "calories"      => stripslashes($row["calories"]),
        "food_cat"      => stripslashes($row["food_cat"]),
        "desc"          => stripslashes($row["desc"]),
        "is_combo"      => stripslashes($row["is_combo"]),
        "combo_price"   => stripslashes($row["combo_price"]),
        "food_quantity" => stripslashes($row["food_quantity"]),
         "food_image"    =>stripslashes($row["food_image"])
    );
}
$output["valuedinner"] = $valuedinner;

// Desserts
$desserts = array();
$query = "SELECT * 
FROM menu 
WHERE food_cat = 'dessert' 
AND food_quantity > 0 
ORDER BY food_name";
foreach ($dbo->query($query) as $row) {
    $desserts[] = array(
        "food_id"       => stripslashes($row["food_id"]),
        "food_name"     => stripslashes($row["food_name"]),
        "price"         => stripslashes($row["price"]),
        "calories"      => stripslashes($row["calories"]),
        "food_cat"      => stripslashes($row["food_cat"]),
        "desc"          => stripslashes($row["desc"]),
        "is_combo"      => stripslashes($row["is_combo"]),
        "combo_price"   => stripslashes($row["combo_price"]),
        "food_quantity" => stripslashes($row["food_quantity"]),
         "food_image"    =>stripslashes($row["food_image"])
    );
}
$output["desserts"] = $desserts;

// Sides
$side = array();
$query = "SELECT * 
FROM menu 
WHERE food_cat = 'side' 
AND food_quantity > 0 
ORDER BY food_name";
foreach ($dbo->query($query) as $row) {
    $side[] = array(
        "food_id"       => stripslashes($row["food_id"]),
        "food_name"     => stripslashes($row["food_name"]),
        "price"         => stripslashes($row["price"]),
        "calories"      => stripslashes($row["calories"]),
        "food_cat"      => stripslashes($row["food_cat"]),
        "desc"          => stripslashes($row["desc"]),
        "is_combo"      => stripslashes($row["is_combo"]),
        "combo_price"   => stripslashes($row["combo_price"]),
        "food_quantity" => stripslashes($row["food_quantity"]),
         "food_image"    =>stripslashes($row["food_image"])
    );
}
$output["side"] = $side;
header('Content-Type: application/json');
echo json_encode($output);
?>