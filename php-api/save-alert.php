<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from React app
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['message'])) {
    $logMessage = $data['message'] . "\n";
    file_put_contents('motion_log.txt', $logMessage, FILE_APPEND);
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No message received']);
}
?>
