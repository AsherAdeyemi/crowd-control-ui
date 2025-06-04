<?php
$logFile = 'motion_log.txt';
if (file_exists($logFile)) {
    echo file_get_contents($logFile);
} else {
    echo '';
}
