import express from "express";
import cors from "cors";
const app = express();
import uuid from "uuid"
import fs from "fs"
const path = require('path');

const PORT = 8350;
import serverless from 'serverless-http'

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

app.use(express.static('public'));

app.use(cors());

const router = express.Router();

let mascotas = [
    {
      titulo: "Prueba 1",
      "transaccion": "ventas",
      "descripcion": "SERGIE",
      "precio": 5000,
      "animal": "gato",
      "raza": "siames",
      "fecha": "2020-09-05",
      "vacuna": "si",
      "id": 102
    },
    {
      "titulo": "Prueba 2",
      "transaccion": "ventas",
      "descripcion": "CONTRATAME",
      "precio": 5000,
      "animal": "perro",
      "raza": "doverman",
      "fecha": "2020-10-31",
      "vacuna": "no",
      "id": 105
    },
    {
      "titulo": "Prueba 2",
      "descripcion": "NO TE VAS A ARREPENTIR",
      "precio": 7500,
      "animal": "gato",
      "raza": "doberman",
      "fecha": "2020-11-20",
      "vacuna": "no",
      "id": 106
    },
    {
      "titulo": "Canela",
      "transaccion": "ventas",
      "descripcion": "canelon",
      "precio": 2350,
      "animal": "gato",
      "raza": "bulldog",
      "fecha": "2020-11-12",
      "vacuna": "no",
      "id": 108
    },
    {
      "titulo": "Prueba de ingreso al formulario",
      "descripcion": "es una prueba",
      "precio": 7500,
      "animal": "perro",
      "raza": "Caniche",
      "fecha": "2024-05-24",
      "vacuna": "no",
      "id": "7364e82f-24cb-4a0a-aa89-dab40f03ceed"
    },
    {
      "titulo": "Prueba de ingreso al formulario 2",
      "descripcion": "es una pruebav2",
      "precio": 7500,
      "animal": "perro",
      "raza": "Caniche",
      "fecha": "2024-05-24",
      "vacuna": "no",
      "id": "0d63cdd0-cf57-43d1-be3a-495c5b1515ea"
    }
  ]


// Ruta para manejar solicitudes GET a /mascotas/
router.get('/mascotas', (req, res) => {
    res.json(mascotas);
});

// Ruta para manejar las solicitudes POST para agregar una nueva mascota
router.post('/mascotas', (req, res) => {
    // Obtén los datos de la nueva mascota
    const nuevaMascota = req.body;
    nuevaMascota.id = uuid.v4();
    //console.log('Nueva mascota recibida:', nuevaMascota);

    mascotas.push(nuevaMascota);
    res.status(201).json({ mensaje: 'Nueva mascota agregada correctamente', mascota: nuevaMascota });
});


router.delete('/mascotas/:id', (req, res) => {
    const idMascota = req.params.id;
    //console.log('ID mascota recibida:', idMascota);
    //console.log('Ruta DELETE recibida:', ruta); // Imprimir la ruta completa

    mascotas = mascotas.filter(mascota => mascota.id !== idMascota);
    res.status(200).json({ mensaje: 'Mascota eliminada correctamente' });
});

router.put('/mascotas/:id', (req, res) => {
    const idMascota = req.params.id;
    const nuevaMascota = req.body; // La nueva información de la mascota a editar
    //console.log('Nueva información de la mascota:', nuevaMascota);
    //console.log('Ruta put recibida:', ruta); // Imprimir la ruta complet

    
    const index = mascotas.findIndex(mascota => mascota.id === idMascota);
        if (index !== -1) {
            mascotas[index] = nuevaMascota; // Reemplazar la mascota existente con la nueva información
        } else {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        res.status(200).json({ mensaje: 'Mascota actualizada correctamente' });
});


app.use('/.netlify/functions/index', router);

module.exports.handler = serverless(app);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});