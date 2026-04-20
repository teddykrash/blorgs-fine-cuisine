<?php 
require_once("./connect_pdo.php");
// Read the raw JSON data from the request body
$jsonData = file_get_contents('php://input');

// Decode the JSON string into a PHP object or associative array
$data = json_decode($jsonData, true); // true for associative array

// Access the data
$item_id = $data['food_id'];
//$item_id = 5;
//echo($item_id);

$menu_output = array();
$query = "SELECT *
FROM menu
WHERE food_id = $item_id";
//$stmt = $dbo->query($query);
//var_dump($stmt);

foreach ($dbo->query($query) as $row) {
    $row_info = array(
    "food_id"       => stripslashes($row["food_id"]),
    "food_name"     => stripslashes($row["food_name"]),
    "price"         => stripslashes($row["price"]),
    "calories"      => stripslashes($row["calories"]),
    "food_cat"      => stripslashes($row["food_cat"]),
    "desc"          => stripslashes($row["desc"]),
    "is_combo"      => stripslashes($row["is_combo"]),
    "combo_price"   => stripslashes($row["combo_price"]),
    "food_quantity" => stripslashes($row["food_quantity"]),
    "food_image"    =>stripslashes($row["food_image"]),
);
    //echo($row_info);
    //var_dump($row_info);
    array_push($menu_output, $row_info);    
};
$json = json_encode($menu_output);
echo($json);



?>