<?php
class Departamento {
    private $conn;
    private $table_name = "departamentos";

    public $id_departamento;
    public $nombre;
    public $id_pais;
    public $situacion_departamento;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function readAll() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE situacion_departamento = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table_name . " (nombre, id_pais, situacion_departamento)
                  VALUES (:nombre, :id_pais, 1)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":id_pais", $this->id_pais);
        return $stmt->execute();
    }

    public function update() {
        $query = "UPDATE " . $this->table_name . " 
                  SET nombre = :nombre, id_pais = :id_pais
                  WHERE id_departamento = :id_departamento";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":id_pais", $this->id_pais);
        $stmt->bindParam(":id_departamento", $this->id_departamento);
        return $stmt->execute();
    }

    public function delete() {
        $query = "UPDATE " . $this->table_name . " SET situacion_departamento = 0 WHERE id_departamento = :id_departamento";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_departamento", $this->id_departamento);
        return $stmt->execute();
    }

    public function getByPais() {
        $query = "SELECT id_departamento, nombre 
                  FROM " . $this->table_name . " 
                  WHERE id_pais = :id_pais AND situacion_departamento = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_pais', $this->id_pais, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }
    
}
?>
