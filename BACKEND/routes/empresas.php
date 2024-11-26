<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../config/database.php';
include_once '../models/Empresa.php';
include_once '../index.php';


$database = new Database();
$db = $database->getConnection();
$empresa = new Empresa($db);

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $empresa->readAll();
        $empresas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($empresas);
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        $empresa->nit = $data->nit;
        $empresa->razon_social = $data->razon_social;
        $empresa->nombre_comercial = $data->nombre_comercial;
        $empresa->telefono = $data->telefono;
        $empresa->correo = $data->correo;
        $empresa->id_departamento = $data->id_departamento;
        $empresa->id_municipio = $data->id_municipio;

        if ($empresa->create()) {
            echo json_encode(["message" => "Empresa creada."]);
        } else {
            echo json_encode(["message" => "No se pudo crear la empresa."]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"));
        $empresa->id_empresa = $data->id_empresa;
        $empresa->nit = $data->nit;
        $empresa->razon_social = $data->razon_social;
        $empresa->nombre_comercial = $data->nombre_comercial;
        $empresa->telefono = $data->telefono;
        $empresa->correo = $data->correo;
        $empresa->id_departamento = $data->id_departamento;
        $empresa->id_municipio = $data->id_municipio;

        if ($empresa->update()) {
            echo json_encode(["message" => "Empresa actualizada."]);
        } else {
            echo json_encode(["message" => "No se pudo actualizar la empresa."]);
        }
        break;

    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"));
        $empresa->id_empresa = $data->id_empresa;

        if ($empresa->delete()) {
            echo json_encode(["message" => "Empresa eliminada."]);
        } else {
            echo json_encode(["message" => "No se pudo eliminar la empresa."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Método no permitido."]);
}
?>
