# Blorgs Fine Cuisine

A full-stack restaurant management system built with PHP, MySQL, and JavaScript. Features a dynamic menu with food images, full CRUD operations, a point-of-sale terminal with real-time inventory tracking, and a Saltwater-inspired responsive design.

## Live Demo

[View Live Site](https://dca.durhamcollege.ca/~nkeafumbomyonga/serverside/assignment9/)

## Features

- Dynamic breakfast, lunch, and dinner menu pages driven by MySQL database
- Full CRUD functionality — add, edit, and delete menu items
- Image management with directory scanning and dropdown selection
- Point-of-sale terminal for breakfast with real-time quantity tracking and running total
- Responsive design with warm cream palette and Playfair Display typography

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** PHP, PDO
- **Database:** MySQL
- **Fonts:** Google Fonts (Playfair Display, Source Sans 3)

## Project Structure

- `index.html` — CRUD management page for all menu items
- `pos.html` — Point-of-sale terminal for breakfast orders
- `breakfast.html` — Breakfast menu with food images
- `lunch.html` — Lunch menu display
- `dinner.html` — Dinner menu display
- `product_edit.html` — Edit individual menu items
- `services/` — Combined PHP API files for menu data
- `img/` — Food images for all 48 menu items
- `css/` — Styling for menu pages and POS terminal

## Setup

1. Clone the repository
2. Create a `connect_pdo.php` file with your database credentials:
```php
<?php
$dbo = new PDO('mysql:host=YOUR_HOST;dbname=YOUR_DB', 'YOUR_USER', 'YOUR_PASS');
?>
```
3. Import the database schema and populate the `menu` table
4. Upload to a PHP-enabled server

## Screenshots

*Coming soon*

## Author

**Yongabi Afumbom**
Durham College — Web Development & Design
