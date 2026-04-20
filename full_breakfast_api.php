<?php
require_once("../connect_pdo.php");
$output = array();

// Regular breakfast items >= 2.50
$breakfast = array();
$query = "SELECT * 
FROM menu 
WHERE food_cat = 'breakfast' 
AND price >= 2.50 
AND food_quantity > 0 
ORDER BY food_name";
foreach ($dbo->query($query) as $row) {
    $breakfast[] = array(
        "food_id"       => stripslashes($row["food_id"]),
        "food_name"     => stripslashes($row["food_name"]),
        "price"         => stripslashes($row["price"]),
        "calories"      => stripslashes($row["calories"]),
        "food_cat"      => stripslashes($row["food_cat"]),
        "desc"          => stripslashes($row["desc"]),
        "is_combo"      => stripslashes($row["is_combo"]),
        "combo_price"   => stripslashes($row["combo_price"]),
        "food_quantity" => stripslashes($row["food_quantity"]),
        "food_image"    => stripslashes($row["food_image"]),
    );
}
$output["breakfast"] = $breakfast;

// Value breakfast items < 2.50
$valueBreakfast = array();
$query = "SELECT * 
FROM menu 
WHERE food_cat = 'breakfast' 
AND price < 2.50 
AND food_quantity > 0 
ORDER BY food_name";
foreach ($dbo->query($query) as $row) {
    $valueBreakfast[] = array(
        "food_id"       => stripslashes($row["food_id"]),
        "food_name"     => stripslashes($row["food_name"]),
        "price"         => stripslashes($row["price"]),
        "calories"      => stripslashes($row["calories"]),
        "food_cat"      => stripslashes($row["food_cat"]),
        "desc"          => stripslashes($row["desc"]),
        "is_combo"      => stripslashes($row["is_combo"]),
        "combo_price"   => stripslashes($row["combo_price"]),
        "food_quantity" => stripslashes($row["food_quantity"]),
        "food_image"    => stripslashes($row["food_image"]),
    );
}
$output["valueBreakfast"] = $valueBreakfast;

header('Content-Type: application/json');
echo json_encode($output);
?>