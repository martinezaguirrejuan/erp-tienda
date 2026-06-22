const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.query('SELECT * FROM categorias', (err, resultado) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(resultado)
  })
})

router.post('/', (req, res) => {
  const { nombre } = req.body
  db.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre], (err, resultado) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ id: resultado.insertId, nombre })
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  db.query('DELETE FROM categorias WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ mensaje: 'Categoría eliminada' })
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { nombre } = req.body
  db.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ id: Number(id),nombre})
  })
})

module.exports = router


