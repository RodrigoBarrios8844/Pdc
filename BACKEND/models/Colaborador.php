<?php
class Colaborador {
    private $conn;
    private $table_name = "colaboradores";

    public $id_colaborador;
    public $nombre;
    public $edad;
    public $telefono;
    public $correo;
    public $id_empresa;
    public $situacion_colaborador;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function readAll() {
        $query = "SELECT c.*, e.nombre_comercial AS empresa
                  FROM " . $this->table_name . " c
                  JOIN empresas e ON c.id_empresa = e.id_empresa
                  WHERE c.situacion_colaborador = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (nombre, edad, telefono, correo, id_empresa, situacion_colaborador) 
                  VALUES (:nombre, :edad, :telefono, :correo, :id_empresa, 1)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":edad", $this->edad);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":correo", $this->correo);
        $stmt->bindParam(":id_empresa", $this->id_empresa);
        return $stmt->execute();
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET nombre = :nombre, edad = :edad, telefono = :telefono, correo = :correo, id_empresa = :id_empresa
                  WHERE id_colaborador = :id_colaborador";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":edad", $this->edad);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":correo", $this->correo);
        $stmt->bindParam(":id_empresa", $this->id_empresa);
        $stmt->bindParam(":id_colaborador", $this->id_colaborador);
        return $stmt->execute();
    }

    public function delete() {
        $query = "UPDATE " . $this->table_name . " SET situacion_colaborador = 0 WHERE id_colaborador = :id_colaborador";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_colaborador", $this->id_colaborador);
        return $stmt->execute();
    }
}
?>
