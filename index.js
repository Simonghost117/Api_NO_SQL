const express = require('express');
const mongoose = require('mongoose');
let dotenv = require('dotenv')
const bodyParser = require('body-parser');
const seriesRoutes = require('./routes/seriesRouter');

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

// Middleware
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(process.env.URL_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión a MongoDB exitosa'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/series', seriesRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
