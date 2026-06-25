const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.query('SELECT * FROM empleados', (err, resultado) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(resultado)
  })
})

router.post('/', (req, res) => {
  const { nombre, cargo, salario, fecha_contratacion, estado, turno } = req.body 
  db.query('INSERT INTO empleados (nombre, cargo, salario, fecha_contratacion, estado, turno) VALUES (?, ?, ?, ?, ?, ?)', [nombre, cargo, salario, fecha_contratacion, estado, turno], (err, resultado) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ id: resultado.insertId, nombre, cargo, salario, fecha_contratacion, estado, turno })
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  db.query('DELETE FROM empleados WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ mensaje: 'Empleado eliminado' })
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { nombre, cargo, salario, fecha_contratacion, estado, turno } = req.body
  db.query('UPDATE empleados SET nombre = ?, cargo = ?, salario = ?, fecha_contratacion = ?, estado = ?, turno = ? WHERE id = ?', [nombre, cargo, salario, fecha_contratacion, estado, turno, id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ id: Number(id), nombre, cargo, salario, fecha_contratacion, estado, turno })
  })
})

module.exports = router


