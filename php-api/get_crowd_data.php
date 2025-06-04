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

$sql = "SELECT Data_ID, Location_ID, Crowd_Count, Timestamp FROM Crowd_Data";
$result = $conn->query($sql);

$crowd_data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $crowd_data[] = $row;
    }
}

echo json_encode($crowd_data);
$conn->close();
?>
