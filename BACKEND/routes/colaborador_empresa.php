<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
include_once '../models/ColaboradorEmpresa.php';
include_once '../index.php';


$database = new Database();
$db = $database->getConnection();
$colaboradorEmpresa = new ColaboradorEmpresa($db);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $colaboradorEmpresa->readAll();
        $relaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($relaciones);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $colaboradorEmpresa->id_colaborador = $data->id_colaborador;
        $colaboradorEmpresa->id_empresa = $data->id_empresa;

        if (!$colaboradorEmpresa->validateIds()) {
            echo json_encode(["message" => "El colaborador o la empresa no existen."]);
        } else if ($colaboradorEmpresa->exists()) {
            echo json_encode(["message" => "La relación ya existe."]);
        } else if ($colaboradorEmpresa->create()) {
            echo json_encode(["message" => "Relación creada."]);
        } else {
            echo json_encode(["message" => "No se pudo crear la relación."]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $colaboradorEmpresa->id = $data->id;

        if (!$colaboradorEmpresa->relationExists()) {
            echo json_encode(["message" => "La relación no existe o ya está eliminada."]);
        } else if ($colaboradorEmpresa->delete()) {
            echo json_encode(["message" => "Relación eliminada."]);
        } else {
            echo json_encode(["message" => "No se pudo eliminar la relación."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido."]);
}
?>
