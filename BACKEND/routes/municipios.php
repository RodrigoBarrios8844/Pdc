<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
include_once '../models/Municipio.php';
include_once '../index.php';

$database = new Database();
$db = $database->getConnection();
$municipio = new Municipio($db);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id_departamento'])) {
            // Obtener municipios por id_departamento
            $municipio->id_departamento = $_GET['id_departamento'];
            $stmt = $municipio->getByDepartamento();
            $municipios = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($municipios);
        } else {
            // Obtener todos los municipios
            $stmt = $municipio->readAll();
            $municipios = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($municipios);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $municipio->nombre = $data->nombre;
        $municipio->id_departamento = $data->id_departamento;

        if ($municipio->create()) {
            echo json_encode(["message" => "Municipio creado."]);
        } else {
            echo json_encode(["message" => "No se pudo crear el municipio."]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $municipio->id_municipio = $data->id_municipio;
        $municipio->nombre = $data->nombre;
        $municipio->id_departamento = $data->id_departamento;

        if ($municipio->update()) {
            echo json_encode(["message" => "Municipio actualizado."]);
        } else {
            echo json_encode(["message" => "No se pudo actualizar el municipio."]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $municipio->id_municipio = $data->id_municipio;

        if ($municipio->delete()) {
            echo json_encode(["message" => "Municipio eliminado."]);
        } else {
            echo json_encode(["message" => "No se pudo eliminar el municipio."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido."]);
}
