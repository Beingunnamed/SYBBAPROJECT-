<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bmi_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $height = $_POST["height"];
    $weight = $_POST["weight"];
    $bmi = $_POST["bmi"];

    $sql = "INSERT INTO bmi_records (height, weight, bmi) VALUES ('$height', '$weight', '$bmi')";

    if ($conn->query($sql) === TRUE) {
        echo "Record added successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>