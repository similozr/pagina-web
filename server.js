

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "elixir_perfumes",
  port: 3306,
});


db.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err);
  } else {
    console.log("Conectado a la base de datos elixir_perfumes");
  }
});




app.post("/clientes", (req, res) => {
  const { nombre, email, telefono, direccion, tarjeta, expiracion, cvv } = req.body;

  const sql = "INSERT INTO clientes (nombre, email, telefono, direccion, tarjeta, expiracion, cvv) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [nombre, email, telefono, direccion, tarjeta, expiracion, cvv ], (err, result) => {
    if (err) {
      res.status(500).send("Error al registrar el usuario");
      console.error(err);
    } else {
      res.send("Usuario registrado exitosamente");
    }
  });
});



// Iniciar el servidor
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
