const express = require('express');
const cors = require('cors');       // <-- Importa cors
const config = require('./config');
const clientes = require('./molulos/clientes/rutas');
const usuario = require('./molulos/users/rutas');
const lucescasa = require('./molulos/lucescasas/rutas');

const app = express();
app.use(cors());
app.use(express.json());

//Configuracion
app.set('port', config.app.port);

//Rutas
app.use('/api/clientes', clientes);
app.use('/api/usuario', usuario);
app.use('/api/lucescasa', lucescasa );

module.exports = app;
