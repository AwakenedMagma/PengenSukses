<?php
function getConnection(){
    $host = "localhost";     // Host database
    $user = "root";          // Username
    $pass = "root";          // Password
    $db   = "Sukses";        // Nama database

    $conn = mysqli_connect($host, $user, $pass, $db);

    if (!$conn) {
        die(json_encode([
            "status" => false,
            "message" => "Koneksi database gagal: " . mysqli_connect_error()
        ]));
    }

    return $conn;
}
?>