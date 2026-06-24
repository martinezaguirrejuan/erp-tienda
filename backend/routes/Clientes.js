const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.query('SELECT * FROM clientes', (err, resultado) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(resultado)
  })
})

router.post('/', (req, res) => {
  const { nombre, apellido, email, telefono, direccion,tipo_cliente,nit,nombre_empresa,} = req.body
  db.query(
    'INSERT INTO clientes (nombre, apellido, email, telefono, direccion, tipo_cliente, nit, nombre_empresa) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre, apellido, email, telefono, direccion, tipo_cliente, nit, nombre_empresa],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ id: resultado.insertId, nombre, apellido, email, telefono, direccion, tipo_cliente, nit, nombre_empresa })
    }
  )
})

router.put('/:id', (req, res) => {                                          
    const id = Number(req.params.id)                                            
    const { nombre, apellido, email, telefono, direccion, tipo_cliente, nit, nombre_empresa } = req.body
    db.query(                                                                   
      'UPDATE clientes SET nombre=?, apellido=?, email=?, telefono=?, direccion=?, tipo_cliente=?, nit=?, nombre_empresa=? WHERE id=?',                                                                        
      [nombre, apellido, email, telefono, direccion, tipo_cliente, nit, nombre_empresa, id],
      (err) => {                                                                
        if (err) return res.status(500).json({ error: err.message })          
        res.json({ id, nombre, apellido, email, telefono, direccion, tipo_cliente, nit, nombre_empresa })                   
      }
    )                                                                           
  })               
 router.delete('/:id', (req, res) => {                                         
    const id = Number(req.params.id)                                            
    db.query('DELETE FROM clientes WHERE id=?', [id], (err) => {
      if (err) return res.status(500).json({ error: err.message })              
      res.json({ mensaje: 'Cliente eliminado' })                             
    })                                                                          
  })

module.exports = router
