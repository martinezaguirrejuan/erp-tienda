import { useEffect, useState } from 'react'

function Productos() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [idCategoria, setIdCategoria] = useState('')
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))

    fetch('http://localhost:4000/api/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data))
  }, [])

  function agregar() {
    fetch('http://localhost:4000/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, precio, stock, id_categoria: idCategoria })
    })
      .then(res => res.json())
      .then(nuevo => {
        setProductos([...productos, nuevo])
        setNombre('')
        setPrecio('')
        setStock('')
        setIdCategoria('')
      })
  }

  function eliminar(id) {
    fetch(`http://localhost:4000/api/productos/${id}`, { method: 'DELETE' })
      .then(() => {
        setProductos(productos.filter(p => p.id !== id))
      })
  }

  function actualizar() {
    fetch(`http://localhost:4000/api/productos/${editando.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: editando.nombre,
        precio: editando.precio,
        stock: editando.stock,
        id_categoria: editando.id_categoria
      })
    })
      .then(res => res.json())
      .then(actualizado => {
        setProductos(productos.map(p => p.id === actualizado.id ? actualizado : p))
        setEditando(null)
      })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>

      <div className="grid grid-cols-2 gap-2 mb-6">
        <input className="border p-2 rounded" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
        <select className="border p-2 rounded" value={idCategoria} onChange={e => setIdCategoria(e.target.value)}>
          <option value="">Selecciona categoría</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
          ))}
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded col-span-2" onClick={agregar}>
          Agregar
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Precio</th>
            <th className="p-2 text-left">Stock</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id} className="border-t">
              <td className="p-2">{prod.id}</td>
              <td className="p-2">{prod.nombre}</td>
              <td className="p-2">{prod.precio}</td>
              <td className="p-2">{prod.stock}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                  onClick={() => setEditando(prod)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => eliminar(prod.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <div className="mt-6 grid grid-cols-2 gap-2 max-w-md">
          <input className="border p-2 rounded" placeholder="Nombre" value={editando.nombre} onChange={e => setEditando({ ...editando, nombre: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Precio" value={editando.precio} onChange={e => setEditando({ ...editando, precio: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Stock" value={editando.stock} onChange={e => setEditando({ ...editando, stock: e.target.value })} />
          <select className="border p-2 rounded" value={editando.id_categoria} onChange={e => setEditando({ ...editando, id_categoria: e.target.value })}>
            <option value="">Selecciona categoría</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={actualizar}>Guardar</button>
          <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setEditando(null)}>Cancelar</button>
        </div>
      )}
    </div>
  )
}

export default Productos
