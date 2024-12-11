const mongoose = require('mongoose');

const SerieSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  temporadas: { type: Number, required: true },
  episodios: { type: Number, required: true },
  estado: { 
    type: String, 
    enum: ['en emisión', 'finalizada', 'cancelada'], 
    default: 'en emisión' 
  },
  fechaEstreno: { type: Date, required: true },
  calificacion: { type: Number, min: 0, max: 10 }, // Calificación promedio
});

module.exports = mongoose.model('Serie', SerieSchema);
