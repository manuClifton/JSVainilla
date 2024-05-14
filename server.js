const express = require('express');
const app = express();
const fs = require('fs');
const uuid = require('uuid');
const PORT = 8350;

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

app.use(express.static('public'));

// Ruta para manejar solicitudes GET a /mascotas/
app.get('/mascotas', (req, res) => {
    // Lee el contenido del archivo db.json
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo db.json:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        // Parsea los datos JSON
        const mascotas = JSON.parse(data);
        // Envía los datos de las mascotas como respuesta
        res.json(mascotas);
    });
});

// Ruta para manejar las solicitudes POST para agregar una nueva mascota
app.post('/mascotas', (req, res) => {
    // Obtén los datos de la nueva mascota del cuerpo de la solicitud
    const nuevaMascota = req.body;
    nuevaMascota.id = uuid.v4();
    console.log('Nueva mascota recibida:', nuevaMascota);
    // Aquí podrías realizar validaciones de los datos recibidos

    // Lee el contenido actual del archivo db.json
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo db.json:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        // Convierte el contenido del archivo a un array de objetos JavaScript
        let dato = JSON.parse(data);
        console.log('DATA', dato.mascotas);
        // Agrega la nueva mascota al array
        dato.mascotas.push(nuevaMascota);

        // Escribe el array actualizado de mascotas de nuevo en el archivo db.json
        fs.writeFile('db.json', JSON.stringify(dato, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo db.json:', err);
                res.status(500).send('Error interno del servidor');
                return;
            }
            // Envía una respuesta indicando que la mascota se ha agregado correctamente
            res.status(201).json({ mensaje: 'Nueva mascota agregada correctamente', mascota: nuevaMascota });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});