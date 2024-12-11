const express = require('express');
const router = express.Router();
const Serie = require('../models/seriesModel');

// Crear una serie
router.post('/', async (req, res) => {
  try {
    const nuevaSerie = new Serie(req.body);
    const serieGuardada = await nuevaSerie.save();
    res.status(201).json(serieGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las series
router.get('/', async (req, res) => {
  try {
    const series = await Serie.find();
    res.status(200).json(series);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una serie por ID
router.get('/:id', async (req, res) => {
  try {
    const serie = await Serie.findById(req.params.id);
    if (!serie) return res.status(404).json({ error: 'Serie no encontrada' });
    res.status(200).json(serie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una serie
router.put('/:id', async (req, res) => {
  try {
    const serieActualizada = await Serie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!serieActualizada) return res.status(404).json({ error: 'Serie no encontrada' });
    res.status(200).json(serieActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una serie
router.delete('/:id', async (req, res) => {
  try {
    const serieEliminada = await Serie.findByIdAndDelete(req.params.id);
    if (!serieEliminada) return res.status(404).json({ error: 'Serie no encontrada' });
    res.status(200).json({ message: 'Serie eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
