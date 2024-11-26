<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
include_once '../models/Colaborador.php';
include_once '../index.php';


$database = new Database();
$db = $database->getConnection();
$colaborador = new Colaborador($db);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $colaborador->readAll();
        $colaboradores = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($colaboradores);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $colaborador->nombre = $data->nombre;
        $colaborador->edad = $data->edad;
        $colaborador->telefono = $data->telefono;
        $colaborador->correo = $data->correo;
        $colaborador->id_empresa = $data->id_empresa;

        if ($colaborador->create()) {
            echo json_encode(["message" => "Colaborador creado."]);
        } else {
            echo json_encode(["message" => "No se pudo crear el colaborador."]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $colaborador->id_colaborador = $data->id_colaborador;
        $colaborador->nombre = $data->nombre;
        $colaborador->edad = $data->edad;
        $colaborador->telefono = $data->telefono;
        $colaborador->correo = $data->correo;
        $colaborador->id_empresa = $data->id_empresa;

        if ($colaborador->update()) {
            echo json_encode(["message" => "Colaborador actualizado."]);
        } else {
            echo json_encode(["message" => "No se pudo actualizar el colaborador."]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $colaborador->id_colaborador = $data->id_colaborador;

        if ($colaborador->delete()) {
            echo json_encode(["message" => "Colaborador eliminado."]);
        } else {
            echo json_encode(["message" => "No se pudo eliminar el colaborador."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido."]);
}
?>
