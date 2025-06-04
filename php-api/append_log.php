<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/x-www-form-urlencoded");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $log = $_POST['log'] ?? '';
    if (!empty($log)) {
        file_put_contents('motion_log.txt', $log . PHP_EOL, FILE_APPEND);
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'No log data']);
    }
    exit;
}

echo json_encode(['success' => false, 'error' => 'Invalid request']);
