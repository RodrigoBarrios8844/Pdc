<?php
class Municipio
{
    private $conn;
    private $table_name = "municipios";

    public $id_municipio;
    public $nombre;
    public $id_departamento;
    public $situacion_municipio;
    public $id_pais;

    public function getByDepartamento()
    {
        $query = "SELECT id_municipio, nombre 
                  FROM " . $this->table_name . " 
                  WHERE id_departamento = :id_departamento AND situacion_municipio = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_departamento', $this->id_departamento);
        $stmt->execute();
        return $stmt;
    }


    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function readAll()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE situacion_municipio = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create()
    {
        $query = "INSERT INTO " . $this->table_name . " (nombre, id_departamento, situacion_municipio)
                  VALUES (:nombre, :id_departamento, 1)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":id_departamento", $this->id_departamento);
        return $stmt->execute();
    }

    public function update()
    {
        $query = "UPDATE " . $this->table_name . " 
                  SET nombre = :nombre, id_departamento = :id_departamento
                  WHERE id_municipio = :id_municipio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":id_departamento", $this->id_departamento);
        $stmt->bindParam(":id_municipio", $this->id_municipio);
        return $stmt->execute();
    }

    public function delete()
    {
        $query = "UPDATE " . $this->table_name . " SET situacion_municipio = 0 WHERE id_municipio = :id_municipio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_municipio", $this->id_municipio);
        return $stmt->execute();
    }

    public function getByPais()
    {
        $query = "SELECT id_departamento, nombre 
                  FROM " . $this->table_name . " 
                  WHERE id_pais = :id_pais AND situacion_departamento = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_pais', $this->id_pais);
        $stmt->execute();
        return $stmt;
    }
}
