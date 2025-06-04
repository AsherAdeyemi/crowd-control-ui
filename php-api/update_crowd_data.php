<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "crowd_control_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the POST request
$location_id = $_POST['location_id'];
$crowd_count = $_POST['crowd_count'];
$timestamp = $_POST['timestamp'];

// Use prepared statement to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO Crowd_Data (Location_ID, Crowd_Count, Timestamp) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $location_id, $crowd_count, $timestamp);

if ($stmt->execute()) {
    echo "Data updated successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
