<?php
class Pais
{
    private $conn;
    private $table_name = "paises";

    public $id_pais;
    public $nombre;
    public $situacion_pais;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function readAll()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE situacion_pais = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function create()
    {
        $query = "INSERT INTO " . $this->table_name . " (nombre, situacion_pais) VALUES (:nombre, 1)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nombre", $this->nombre);
        return $stmt->execute();
    }

    public function update()
    {
        $query = "UPDATE " . $this->table_name . " SET nombre = :nombre WHERE id_pais = :id_pais";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nombre", $this->nombre);
        $stmt->bindParam(":id_pais", $this->id_pais);
        return $stmt->execute();
    }

    public function delete()
    {
        $query = "UPDATE " . $this->table_name . " SET situacion_pais = 0 WHERE id_pais = :id_pais";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_pais", $this->id_pais);
        return $stmt->execute();
    }
}
