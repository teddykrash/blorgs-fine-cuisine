<?php 
require_once("../connect_pdo.php");
$menu_output = array();
$query = "SELECT *
FROM menu
WHERE menu.food_cat = 'dinner'
AND menu.price >= '4.50'
ORDER BY food_name";
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
header('Content-Type: application/json');
echo($json);
?>