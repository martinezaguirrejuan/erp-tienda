const express = require('express')
const router = express.Router()
const db = require('../db')

router.get('/', (req, res) => {
  db.query('SELECT * FROM productos', (err, resultado) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(resultado)
  })
})

router.post('/', (req, res) => {
  const { nombre, precio, stock, id_categoria } = req.body
  db.query(
    'INSERT INTO productos (nombre, precio, stock, id_categoria) VALUES (?, ?, ?, ?)',
    [nombre, precio, stock, id_categoria],
    (err, resultado) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ id: resultado.insertId, nombre, precio, stock, id_categoria })
    }
  )
})

router.put('/:id', (req, res) => {                                          
    const id = Number(req.params.id)                                            
    const { nombre, precio, stock, id_categoria } = req.body
    db.query(                                                                   
      'UPDATE productos SET nombre=?, precio=?, stock=?, id_categoria=? WHERE id=?',                                                                        
      [nombre, precio, stock, id_categoria, id],
      (err) => {                                                                
        if (err) return res.status(500).json({ error: err.message })          
        res.json({ id, nombre, precio, stock, id_categoria })                   
      }
    )                                                                           
  })               
 router.delete('/:id', (req, res) => {                                         
    const id = Number(req.params.id)                                            
    db.query('DELETE FROM productos WHERE id=?', [id], (err) => {
      if (err) return res.status(500).json({ error: err.message })              
      res.json({ mensaje: 'Producto eliminado' })                             
    })                                                                          
  })

module.exports = router
