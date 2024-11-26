<?php
class ColaboradorEmpresa {
    private $conn;
    private $table_name = "colaborador_empresa";

    public $id;
    public $id_colaborador;
    public $id_empresa;
    public $situacion_colaborador_empresa;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Leer todas las relaciones activas
    public function readAll() {
        $query = "SELECT ce.id, c.nombre AS colaborador, e.nombre_comercial AS empresa
                  FROM " . $this->table_name . " ce
                  JOIN colaboradores c ON ce.id_colaborador = c.id_colaborador
                  JOIN empresas e ON ce.id_empresa = e.id_empresa
                  WHERE ce.situacion_colaborador_empresa = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Validar si la relación ya existe
    public function exists() {
        $query = "SELECT COUNT(*) as total FROM " . $this->table_name . " 
                  WHERE id_colaborador = :id_colaborador AND id_empresa = :id_empresa 
                  AND situacion_colaborador_empresa = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_colaborador", $this->id_colaborador);
        $stmt->bindParam(":id_empresa", $this->id_empresa);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['total'] > 0;
    }

    // Validar si colaborador y empresa existen
    public function validateIds() {
        $query = "SELECT 
                    (SELECT COUNT(*) FROM colaboradores WHERE id_colaborador = :id_colaborador AND situacion_colaborador = 1) as colaborador_existe,
                    (SELECT COUNT(*) FROM empresas WHERE id_empresa = :id_empresa AND situacion_empresa = 1) as empresa_existe";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_colaborador", $this->id_colaborador);
        $stmt->bindParam(":id_empresa", $this->id_empresa);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['colaborador_existe'] > 0 && $result['empresa_existe'] > 0;
    }

    // Validar si la relación existe antes de eliminar
    public function relationExists() {
        $query = "SELECT COUNT(*) as total FROM " . $this->table_name . " 
                  WHERE id = :id AND situacion_colaborador_empresa = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['total'] > 0;
    }

    // Crear relación
    public function create() {
        $query = "INSERT INTO " . $this->table_name . " (id_colaborador, id_empresa, situacion_colaborador_empresa)
                  VALUES (:id_colaborador, :id_empresa, 1)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_colaborador", $this->id_colaborador);
        $stmt->bindParam(":id_empresa", $this->id_empresa);
        return $stmt->execute();
    }

    // Eliminar relación (lógica)
    public function delete() {
        $query = "UPDATE " . $this->table_name . " 
                  SET situacion_colaborador_empresa = 0 
                  WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        return $stmt->execute();
    }
}
?>
