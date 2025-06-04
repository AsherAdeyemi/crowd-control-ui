<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "crowd_control_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT Alert_ID, Location_ID, Message, Timestamp FROM Alerts";
$result = $conn->query($sql);

$alerts = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $alerts[] = $row;
    }
}

echo json_encode($alerts);
$conn->close();
?>
