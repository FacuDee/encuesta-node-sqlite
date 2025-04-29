const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Configuración de la base de datos SQLite
const dbPath = path.join(__dirname, "../database/encuestas.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err.message);
  } else {
    console.log("Conectado a la base de datos SQLite");
    inicializarDB();
  }
});

// Función para crear la tabla y las columnas necesarias
async function inicializarDB() {
  try {
    // Crear tabla 'encuestas' si no existe
    await db.run(`CREATE TABLE IF NOT EXISTS encuestas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            p1 INTEGER,
            p2 INTEGER,
            p3 INTEGER,
            p4 INTEGER,
            p5 INTEGER,
            fecha TEXT
        )`);
    console.log("Tabla 'encuestas' creada o ya existente.");
  } catch (err) {
    console.error("Error al crear la tabla o agregar columnas:", err.message);
  }
}

// Guardamos métodos originales
const originalRun = db.run.bind(db);
const originalAll = db.all.bind(db);

// Reemplazamos con versiones "promisificadas"
db.run = function (sql, params = []) {
  return new Promise((resolve, reject) => {
    originalRun(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

db.all = function (sql, params = []) {
  return new Promise((resolve, reject) => {
    originalAll(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

module.exports = db;
