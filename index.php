<?php 
require_once("./connect_pdo.php");
echo("
<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>Document</title>
</head>
<body>
<h1>The Menu</h1>
");
$query = "SELECT *
FROM menu
ORDER BY food_name";
foreach ($dbo->query($query) as $row) {
    $food_name = stripslashes($row["food_name"]);
    $price = stripslashes($row["price"]);
    $calories = stripslashes($row["calories"]);
    echo("<p>$food_name: \$$food_price  -   $food_calories Calories</p>");
};
echo("
</body>
</html>
");
?>