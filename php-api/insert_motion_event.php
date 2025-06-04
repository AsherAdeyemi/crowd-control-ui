<?php
// Allow cross-origin requests
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');

// Read POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (!$data || !isset($data['location_id'], $data['crowd_count'], $data['timestamp'])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

// Supabase credentials
$supabaseUrl = "https://uotfijvozpyruiwwwaxd.supabase.co";
$apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvdGZpanZvenB5cnVpd3d3YXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMDkwNDMsImV4cCI6MjA2MTc4NTA0M30.gQ44LbMOqc2vTn4KsGvBXEXw-Vt1MZrmRTltEM80r2c";

// Prepare data
$payload = json_encode([
    "location_id" => $data['location_id'],
    "crowd_count" => $data['crowd_count'],
    "timestamp" => $data['timestamp']
]);

// Initialize cURL
$ch = curl_init("$supabaseUrl/rest/v1/crowd_data");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "apikey: $apiKey",
    "Authorization: Bearer $apiKey",
    "Prefer: return=representation"
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// Response handling
if ($http_code >= 200 && $http_code < 300) {
    echo json_encode(["status" => "success", "response" => json_decode($response)]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => $error ?: "Supabase insert failed",
        "supabase_response" => $response
    ]);
}
?>
