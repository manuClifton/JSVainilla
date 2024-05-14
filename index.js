const express = require('express');
const app = express();
const fs = require('fs');
const uuid = require('uuid');
const PORT = 8350;

const cors = require('cors');
app.use(cors());
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


app.delete('/mascotas/:id', (req, res) => {
    const idMascota = req.params.id;
    console.log('ID mascota recibida:', idMascota);

    const ruta = req.path; // Obtener la ruta completa, incluyendo los parámetros
    console.log('Ruta DELETE recibida:', ruta); // Imprimir la ruta completa

    // leo el archivo db.json
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo db.json:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        // Parsear el contenido del archivo JSON a un objeto JavaScript
        let dato = JSON.parse(data);
            console.log('ID mascota recibida:', dato);

        // Buscar la mascota por su ID y eliminarla
        dato.mascotas = dato.mascotas.filter(mascota => mascota.id !== idMascota);

        // Escribir el contenido actualizado de vuelta al archivo db.json
        fs.writeFile('db.json', JSON.stringify(dato), 'utf8', err => {
            if (err) {
                console.error('Error al escribir en el archivo db.json:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            
            res.status(200).json({ mensaje: 'Mascota eliminada correctamente' });
        });
    });
});

app.put('/mascotas/:id', (req, res) => {
    const idMascota = req.params.id;
    const nuevaMascota = req.body; // La nueva información de la mascota a editar
    console.log('Nueva información de la mascota:', nuevaMascota);
    const ruta = req.path; // Obtener la ruta completa, incluyendo los parámetros
    console.log('Ruta put recibida:', ruta); // Imprimir la ruta complet
    // Leer el contenido actual del archivo db.json
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo db.json:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        // Parsear el contenido del archivo JSON a un objeto JavaScript
        let mascotas = JSON.parse(data);

        // Encontrar la mascota por su ID y actualizarla con la nueva información
        const index = mascotas.findIndex(mascota => mascota.id === idMascota);
        if (index !== -1) {
            mascotas[index] = nuevaMascota; // Reemplazar la mascota existente con la nueva información
        } else {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }

        // Escribir el contenido actualizado de vuelta al archivo db.json
        fs.writeFile('db.json', JSON.stringify(mascotas), 'utf8', err => {
            if (err) {
                console.error('Error al escribir en el archivo db.json:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            
            res.status(200).json({ mensaje: 'Mascota actualizada correctamente' });
        });
    });
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});