const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.query('SELECT * FROM proveedores', (err, resultado) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(resultado)
  })
})

router.post('/', (req, res) => {
  const { nit, digito_verificacion, empresa, nombre, telefono, email, direccion, estado } = req.body
  db.query(
    'INSERT INTO proveedores (nit,digito_verificacion,empresa,nombre,telefono,email,direccion,estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nit, digito_verificacion, empresa, nombre, telefono, email, direccion, estado],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ id: resultado.insertId, nit, digito_verificacion, empresa, nombre, telefono, email, direccion, estado })
    }
  )
})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const { nit, digito_verificacion, empresa, nombre, telefono, email, direccion, estado } = req.body
  db.query(
    'UPDATE proveedores SET nit=?, digito_verificacion=?, empresa=?, nombre=?, telefono=?, email=?, direccion=?, estado=? WHERE id=?',
    [nit, digito_verificacion, empresa, nombre, telefono, email, direccion, estado, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ id, nit, digito_verificacion, empresa, nombre, telefono, email, direccion, estado })
    }
  )
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  db.query('DELETE FROM proveedores WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ mensaje: 'Proveedor eliminado' })
  })
})

module.exports = router
