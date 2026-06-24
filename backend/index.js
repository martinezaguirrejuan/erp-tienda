const express = require('express')
const cors = require('cors')
const categoriasRouter = require('./routes/Categorias')
const productosRouter = require('./routes/Productos')
const clientesRouter = require('./routes/Clientes')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/categorias', categoriasRouter)
app.use('/api/productos', productosRouter)
app.use('/api/clientes', clientesRouter)

app.get('/', (req, res) => {
  res.send('Servidor ERP funcionando')
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Servidor corriendo en puerto 4000')
})
