<?php
class Empresa {
    private $conn;
    private $table_name = "empresas";

    public $id_empresa;
    public $nit;
    public $razon_social;
    public $nombre_comercial;
    public $telefono;
    public $correo;
    public $id_departamento;
    public $id_municipio;
    public $situacion_empresa;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function readAll() {
        $query = "SELECT e.*, d.nombre AS departamento, m.nombre AS municipio
                  FROM " . $this->table_name . " e
                  JOIN departamentos d ON e.id_departamento = d.id_departamento
                  JOIN municipios m ON e.id_municipio = m.id_municipio
                  WHERE e.situacion_empresa = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (nit, razon_social, nombre_comercial, telefono, correo, id_departamento, id_municipio, situacion_empresa) 
                  VALUES (:nit, :razon_social, :nombre_comercial, :telefono, :correo, :id_departamento, :id_municipio, 1)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nit", $this->nit);
        $stmt->bindParam(":razon_social", $this->razon_social);
        $stmt->bindParam(":nombre_comercial", $this->nombre_comercial);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":correo", $this->correo);
        $stmt->bindParam(":id_departamento", $this->id_departamento);
        $stmt->bindParam(":id_municipio", $this->id_municipio);
        return $stmt->execute();
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET nit = :nit, razon_social = :razon_social, nombre_comercial = :nombre_comercial, 
                      telefono = :telefono, correo = :correo, id_departamento = :id_departamento, id_municipio = :id_municipio
                  WHERE id_empresa = :id_empresa";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nit", $this->nit);
        $stmt->bindParam(":razon_social", $this->razon_social);
        $stmt->bindParam(":nombre_comercial", $this->nombre_comercial);
        $stmt->bindParam(":telefono", $this->telefono);
        $stmt->bindParam(":correo", $this->correo);
        $stmt->bindParam(":id_departamento", $this->id_departamento);
        $stmt->bindParam(":id_municipio", $this->id_municipio);
        $stmt->bindParam(":id_empresa", $this->id_empresa);
        return $stmt->execute();
    }

    public function delete() {
        $query = "UPDATE " . $this->table_name . " SET situacion_empresa = 0 WHERE id_empresa = :id_empresa";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_empresa", $this->id_empresa);
        return $stmt->execute();
    }
}
?>
