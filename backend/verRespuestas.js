const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database/encuestas.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos encuestas.db');
    }
});

db.all('SELECT * FROM encuestas', [], (err, rows) => {
    if (err) {
        console.error('Error al consultar encuestas:', err.message);
    } else if (rows.length === 0) {
        console.log('No hay encuestas registradas aún.');
    } else {
        console.log('Encuestas registradas:');
        rows.forEach((row, index) => {
            console.log(`Encuesta #${index + 1}:`, row);
        });
    }
    db.close();
});
