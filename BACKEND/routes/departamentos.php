<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
include_once '../models/Departamento.php';
include_once '../index.php';

$database = new Database();
$db = $database->getConnection();
$departamento = new Departamento($db);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id_pais'])) {
            // Obtener departamentos por id_pais
            $departamento->id_pais = $_GET['id_pais'];
            $stmt = $departamento->getByPais();
            $departamentos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($departamentos);
        } else {
            // Obtener todos los departamentos
            $stmt = $departamento->readAll();
            $departamentos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($departamentos);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $departamento->nombre = $data->nombre;
        $departamento->id_pais = $data->id_pais;

        if ($departamento->create()) {
            echo json_encode(["message" => "Departamento creado."]);
        } else {
            echo json_encode(["message" => "No se pudo crear el departamento."]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $departamento->id_departamento = $data->id_departamento;
        $departamento->nombre = $data->nombre;
        $departamento->id_pais = $data->id_pais;

        if ($departamento->update()) {
            echo json_encode(["message" => "Departamento actualizado."]);
        } else {
            echo json_encode(["message" => "No se pudo actualizar el departamento."]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $departamento->id_departamento = $data->id_departamento;

        if ($departamento->delete()) {
            echo json_encode(["message" => "Departamento eliminado."]);
        } else {
            echo json_encode(["message" => "No se pudo eliminar el departamento."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido."]);
}
