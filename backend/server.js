const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const db = require('./database.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// Rutas
app.post('/api/encuestas', async (req, res) => {
    try {
        const { p1, p2, p3, p4, p5} = req.body;

        const fechaActual = new Date().toISOString();
        
        // Insertar en la base de datos
        await db.run(
            `INSERT INTO encuestas (p1, p2, p3, p4, p5, fecha) VALUES (?, ?, ?, ?, ?, ?)`,
            [p1, p2, p3, p4, p5, fechaActual]
        );
        
        res.status(201).json({ message: 'Encuesta guardada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar la encuesta' });
    }
});

app.get('/api/resultados', async (req, res) => {
    try {
        const resultados = await db.all('SELECT * FROM encuestas');
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener resultados' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});