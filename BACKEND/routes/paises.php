<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
include_once '../models/Pais.php';
include_once '../index.php';

$database = new Database();
$db = $database->getConnection();
$pais = new Pais($db);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pais->readAll();
        $paises = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($paises);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $pais->nombre = $data->nombre;
        if ($pais->create()) {
            echo json_encode(["message" => "País creado."]);
        } else {
            echo json_encode(["message" => "No se pudo crear el país."]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $pais->id_pais = $data->id_pais;
        $pais->nombre = $data->nombre;
        if ($pais->update()) {
            echo json_encode(["message" => "País actualizado."]);
        } else {
            echo json_encode(["message" => "No se pudo actualizar el país."]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $pais->id_pais = $data->id_pais;
        if ($pais->delete()) {
            echo json_encode(["message" => "País eliminado."]);
        } else {
            echo json_encode(["message" => "No se pudo eliminar el país."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido."]);
}
