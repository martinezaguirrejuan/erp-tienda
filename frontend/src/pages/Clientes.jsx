import { useEffect, useState } from 'react'

function Clientes() {
  const [clientes, setClientes] = useState([])
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [tipo_cliente, setTipoCliente] = useState('persona')
  const [nit, setNit] = useState('')
  const [nombre_empresa, setNombreEmpresa] = useState('')
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data))
  }, [])

  function agregar() {
    fetch('http://localhost:4000/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, email, telefono, direccion, tipo_cliente, nit, nombre_empresa })
    })
      .then(res => res.json())
      .then(nuevo => {
        setClientes([...clientes, nuevo])
        setNombre('')
        setApellido('')
        setEmail('')
        setTelefono('')
        setDireccion('')
        setTipoCliente('persona')
        setNit('')
        setNombreEmpresa('')
      })
  }

  function eliminar(id) {
    fetch(`http://localhost:4000/api/clientes/${id}`, { method: 'DELETE' })
      .then(() => {
        setClientes(clientes.filter(c => c.id !== id))
      })
  }

  function actualizar() {
    fetch(`http://localhost:4000/api/clientes/${editando.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: editando.nombre,
        apellido: editando.apellido,
        email: editando.email,
        telefono: editando.telefono,
        direccion: editando.direccion,
        tipo_cliente: editando.tipo_cliente,
        nit: editando.nit,
        nombre_empresa: editando.nombre_empresa
      })
    })
      .then(res => res.json())
      .then(actualizado => {
        setClientes(clientes.map(c => c.id === actualizado.id ? actualizado : c))
        setEditando(null)
      })
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-3xl font-bold text-center mb-6">Clientes</h1>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <input className="border p-2 rounded" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
          <input className="border p-2 rounded" placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
          <input className="border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="border p-2 rounded" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
          <input className="border p-2 rounded col-span-2" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />

          <select className="border p-2 rounded col-span-2" value={tipo_cliente} onChange={e => setTipoCliente(e.target.value)}>
            <option value="persona">Persona</option>
            <option value="empresa">Empresa</option>
          </select>

          {tipo_cliente === 'empresa' && (
            <>
              <input className="border p-2 rounded" placeholder="NIT" value={nit} onChange={e => setNit(e.target.value)} />
              <input className="border p-2 rounded" placeholder="Nombre empresa" value={nombre_empresa} onChange={e => setNombreEmpresa(e.target.value)} />
            </>
          )}

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded col-span-2" onClick={agregar}>
            Agregar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Apellido</th>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-left">Teléfono</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{c.id}</td>
                  <td className="p-3">{c.nombre}</td>
                  <td className="p-3">{c.apellido}</td>
                  <td className="p-3 capitalize">{c.tipo_cliente}</td>
                  <td className="p-3">{c.telefono}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded" onClick={() => setEditando(c)}>Editar</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => eliminar(c.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editando && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <input className="border p-2 rounded" placeholder="Nombre" value={editando.nombre} onChange={e => setEditando({ ...editando, nombre: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Apellido" value={editando.apellido} onChange={e => setEditando({ ...editando, apellido: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Email" value={editando.email} onChange={e => setEditando({ ...editando, email: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Teléfono" value={editando.telefono} onChange={e => setEditando({ ...editando, telefono: e.target.value })} />
            <input className="border p-2 rounded col-span-2" placeholder="Dirección" value={editando.direccion} onChange={e => setEditando({ ...editando, direccion: e.target.value })} />

            <select className="border p-2 rounded col-span-2" value={editando.tipo_cliente} onChange={e => setEditando({ ...editando, tipo_cliente: e.target.value })}>
              <option value="persona">Persona</option>
              <option value="empresa">Empresa</option>
            </select>

            {editando.tipo_cliente === 'empresa' && (
              <>
                <input className="border p-2 rounded" placeholder="NIT" value={editando.nit || ''} onChange={e => setEditando({ ...editando, nit: e.target.value })} />
                <input className="border p-2 rounded" placeholder="Nombre empresa" value={editando.nombre_empresa || ''} onChange={e => setEditando({ ...editando, nombre_empresa: e.target.value })} />
              </>
            )}

            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={actualizar}>Guardar</button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setEditando(null)}>Cancelar</button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Clientes
