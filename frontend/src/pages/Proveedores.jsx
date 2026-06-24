import { useEffect, useState } from 'react'

function Proveedores() {
  const [proveedores, setProveedores] = useState([])
  const [nit, setNit] = useState('')
  const [digito_verificacion, setDigitoVerificacion] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [direccion, setDireccion] = useState('')
  const [estado, setEstado] = useState('activo')
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/api/proveedores')
      .then(res => res.json())
      .then(data => setProveedores(data))
  }, [])

  function agregar() {
    fetch('http://localhost:4000/api/proveedores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nit, digito_verificacion, empresa, nombre, telefono, email, direccion, estado })
    })
      .then(res => res.json())
      .then(nuevo => {
        setProveedores([...proveedores, nuevo])
        setNit('')
        setDigitoVerificacion('')
        setEmpresa('')
        setNombre('')
        setTelefono('')
        setEmail('')
        setDireccion('')
        setEstado('activo')
      })
  }

  function eliminar(id) {
    fetch(`http://localhost:4000/api/proveedores/${id}`, { method: 'DELETE' })
      .then(() => {
        setProveedores(proveedores.filter(p => p.id !== id))
      })
  }

  function actualizar() {
    fetch(`http://localhost:4000/api/proveedores/${editando.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nit: editando.nit,
        digito_verificacion: editando.digito_verificacion,
        empresa: editando.empresa,
        nombre: editando.nombre,
        telefono: editando.telefono,
        email: editando.email,
        direccion: editando.direccion,
        estado: editando.estado
      })
    })
      .then(res => res.json())
      .then(actualizado => {
        setProveedores(proveedores.map(p => p.id === actualizado.id ? actualizado : p))
        setEditando(null)
      })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Proveedores</h1>

      <div className="grid grid-cols-2 gap-2 mb-6">
        <input className="border p-2 rounded" placeholder="NIT" value={nit} onChange={e => setNit(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Dígito verificación" value={digito_verificacion} onChange={e => setDigitoVerificacion(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Empresa" value={empresa} onChange={e => setEmpresa(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Nombre contacto" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
        <input className="border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 rounded col-span-2" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />

        <select className="border p-2 rounded col-span-2" value={estado} onChange={e => setEstado(e.target.value)}>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded col-span-2" onClick={agregar}>
          Agregar
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">NIT</th>
            <th className="p-2 text-left">Empresa</th>
            <th className="p-2 text-left">Teléfono</th>
            <th className="p-2 text-left">Estado</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.nit}-{p.digito_verificacion}</td>
              <td className="p-2">{p.empresa}</td>
              <td className="p-2">{p.telefono}</td>
              <td className="p-2">{p.estado}</td>
              <td className="p-2 flex gap-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => setEditando(p)}>Editar</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => eliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editando && (
        <div className="mt-6 grid grid-cols-2 gap-2 max-w-md">
          <input className="border p-2 rounded" placeholder="NIT" value={editando.nit} onChange={e => setEditando({ ...editando, nit: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Dígito verificación" value={editando.digito_verificacion} onChange={e => setEditando({ ...editando, digito_verificacion: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Empresa" value={editando.empresa} onChange={e => setEditando({ ...editando, empresa: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Nombre contacto" value={editando.nombre} onChange={e => setEditando({ ...editando, nombre: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Teléfono" value={editando.telefono} onChange={e => setEditando({ ...editando, telefono: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Email" value={editando.email} onChange={e => setEditando({ ...editando, email: e.target.value })} />
          <input className="border p-2 rounded col-span-2" placeholder="Dirección" value={editando.direccion} onChange={e => setEditando({ ...editando, direccion: e.target.value })} />

          <select className="border p-2 rounded col-span-2" value={editando.estado} onChange={e => setEditando({ ...editando, estado: e.target.value })}>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={actualizar}>Guardar</button>
          <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={() => setEditando(null)}>Cancelar</button>
        </div>
      )}
    </div>
  )
}

export default Proveedores
