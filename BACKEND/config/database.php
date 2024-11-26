<?php
class Database {
    private $host = "localhost";
    private $db_name = "gestion_recursos_humanos";
    private $username = "root"; // Cambia según tus credenciales
    private $password = "";     // Cambia según tus credenciales
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo "conecto";
        } catch (PDOException $exception) {
            echo "Error de conexión: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>
