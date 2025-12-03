<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include "koneksi.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    // GET all users
    case 'GET':
        $conn = getConnection();
        $query = mysqli_query($conn, "SELECT * FROM UserSukses");
        $data = [];
        while ($row = mysqli_fetch_assoc($query)) {
            $data[] = $row;
        }

        echo json_encode([
            "status" => true,
            "data" => $data
        ]);

        mysqli_close($conn);
        break;

    // INSERT user
    case 'POST':
        $conn = getConnection();
        $input = json_decode(file_get_contents("php://input"), true);

        $nama = $input['nama'];
        $email = $input['email'];

        $query = mysqli_query($conn, "INSERT INTO UserSukses (nama, email) VALUES ('$nama', '$email')");

        echo json_encode([
            "status" => $query ? true : false,
            "message" => $query ? "User berhasil ditambahkan" : "Gagal menambah user"
        ]);

        mysqli_close($conn);
        break;

    // UPDATE user
    case 'PUT':
        $conn = getConnection();
        $input = json_decode(file_get_contents("php://input"), true);

        $id    = $input['id'];
        $nama  = $input['nama'];
        $email = $input['email'];

        $query = mysqli_query($conn, "UPDATE UserSukses SET nama='$nama', email='$email' WHERE id=$id");

        echo json_encode([
            "status" => $query ? true : false,
            "message" => $query ? "User berhasil diperbarui" : "Gagal memperbarui user"
        ]);

        mysqli_close($conn);
        break;

    // DELETE user
    case 'DELETE':
        $conn = getConnection();
        $input = json_decode(file_get_contents("php://input"), true);

        $id = $input['id'];

        $query = mysqli_query($conn, "DELETE FROM UserSukses WHERE id=$id");

        echo json_encode([
            "status" => $query ? true : false,
            "message" => $query ? "User berhasil dihapus" : "Gagal menghapus user"
        ]);

        mysqli_close($conn);
        break;

    default:
        echo json_encode([
            "status" => false,
            "message" => "Method tidak diizinkan!"
        ]);
        break;
}
?>
