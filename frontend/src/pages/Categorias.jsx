import { useEffect, useState } from 'react'

function Categorias() {
  const [categorias, setCategorias] = useState([])
  const [nombre, setNombre] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [nombreEditar, setNombreEditar] = useState('')

  useEffect(() => {
    fetch('http://localhost:4000/api/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data))
  }, [])

  function agregar() {
    fetch('http://localhost:4000/api/categorias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre })
    })
      .then(res => res.json())
      .then(nueva => {
        setCategorias([...categorias, nueva])
        setNombre('')
      })
  }

  function eliminar(id) {
    fetch(`http://localhost:4000/api/categorias/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        setCategorias(categorias.filter(cat => cat.id !== id))
      })
  }

  function editar() {
    fetch(`http://localhost:4000/api/categorias/${editandoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreEditar })
    })
      .then(res => res.json())
      .then(actualizada => {
        setCategorias(categorias.map(cat =>
          cat.id === actualizada.id ? actualizada : cat
        ))
        setEditandoId(null)
        setNombreEditar('')
      })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>

      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded w-64"
          placeholder="Nombre de la categoría"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={agregar}
        >
          Agregar
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(cat => (
            <tr key={cat.id} className="border-t">
              <td className="p-2">{cat.id}</td>
              <td className="p-2">{cat.nombre}</td>
              <td className="p-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => eliminar(cat.id)}
                >
                  Eliminar
                </button>
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded ml-2"
                  onClick={() => {
                    setEditandoId(cat.id)
                    setNombreEditar(cat.nombre)
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editandoId && (
        <div className="mt-6 flex gap-2">
          <input
            className="border p-2 rounded w-64"
            value={nombreEditar}
            onChange={e => setNombreEditar(e.target.value)}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={editar}
          >
            Guardar
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={() => setEditandoId(null)}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  )
}

export default Categorias
