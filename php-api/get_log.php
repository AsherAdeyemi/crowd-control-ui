<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain");

$logFile = 'motion_log.txt';

if (file_exists($logFile)) {
    echo file_get_contents($logFile);
} else {
    echo "No log file found.";
}
