import { useEffect, useState } from 'react'

function Empleados() {
  const [empleados, setEmpleados] = useState([])
  const [nombre, setNombre] = useState('')
  const [cargo, setCargo] = useState('')
  const [salario, setSalario] = useState('')
  const [fechaContratacion, setFechaContratacion] = useState('')
  const [estado, setEstado] = useState('')
  const [turno, setTurno] = useState('')
  const [editando, setEditando] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/api/empleados')
      .then(res => res.json())
      .then(data => setEmpleados(data))
      .catch(err => console.error(err))
  }, [])

  function agregar() {
    fetch('http://localhost:4000/api/empleados', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre,
        cargo,
        salario,
        fecha_contratacion: fechaContratacion,
        estado,
        turno
      })
    })
      .then(res => res.json())
      .then(nuevo => {
        setEmpleados([...empleados, nuevo])

        setNombre('')
        setCargo('')
        setSalario('')
        setFechaContratacion('')
        setEstado('')
        setTurno('')
      })
      .catch(err => console.error(err))
  }

  function eliminar(id) {
    fetch(`http://localhost:4000/api/empleados/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setEmpleados(empleados.filter(e => e.id !== id))
      })
      .catch(err => console.error(err))
  }

  function actualizar() {
    fetch(`http://localhost:4000/api/empleados/${editando.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: editando.nombre,
        cargo: editando.cargo,
        salario: editando.salario,
        fecha_contratacion: editando.fecha_contratacion,
        estado: editando.estado,
        turno: editando.turno
      })
    })
      .then(res => res.json())
      .then(actualizado => {
        setEmpleados(
          empleados.map(e =>
            e.id === actualizado.id ? actualizado : e
          )
        )

        setEditando(null)
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-3xl font-bold text-center mb-6">Empleados</h1>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <input className="border p-2 rounded" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
          <input className="border p-2 rounded" placeholder="Cargo" value={cargo} onChange={e => setCargo(e.target.value)} />
          <input type="number" className="border p-2 rounded" placeholder="Salario" value={salario} onChange={e => setSalario(e.target.value)} />
          <input type="date" className="border p-2 rounded" value={fechaContratacion} onChange={e => setFechaContratacion(e.target.value)} />

          <select className="border p-2 rounded" value={estado} onChange={e => setEstado(e.target.value)}>
            <option value="">Selecciona estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>

          <select className="border p-2 rounded" value={turno} onChange={e => setTurno(e.target.value)}>
            <option value="">Selecciona turno</option>
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
            <option value="noche">Noche</option>
          </select>

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
                <th className="p-3 text-left">Cargo</th>
                <th className="p-3 text-left">Salario</th>
                <th className="p-3 text-left">Fecha</th>
                <th className="p-3 text-left">Estado</th>
                <th className="p-3 text-left">Turno</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map(emp => (
                <tr key={emp.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{emp.id}</td>
                  <td className="p-3">{emp.nombre}</td>
                  <td className="p-3">{emp.cargo}</td>
                  <td className="p-3">${Number(emp.salario).toLocaleString()}</td>
                  <td className="p-3">{emp.fecha_contratacion?.split('T')[0]}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${emp.estado === 'activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {emp.estado}
                    </span>
                  </td>
                  <td className="p-3 capitalize">{emp.turno}</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded" onClick={() => setEditando(emp)}>Editar</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => eliminar(emp.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editando && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <input className="border p-2 rounded" value={editando.nombre} onChange={e => setEditando({ ...editando, nombre: e.target.value })} />
            <input className="border p-2 rounded" value={editando.cargo} onChange={e => setEditando({ ...editando, cargo: e.target.value })} />
            <input type="number" className="border p-2 rounded" value={editando.salario} onChange={e => setEditando({ ...editando, salario: e.target.value })} />
            <input type="date" className="border p-2 rounded" value={editando.fecha_contratacion?.split('T')[0]} onChange={e => setEditando({ ...editando, fecha_contratacion: e.target.value })} />

            <select className="border p-2 rounded" value={editando.estado} onChange={e => setEditando({ ...editando, estado: e.target.value })}>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>

            <select className="border p-2 rounded" value={editando.turno} onChange={e => setEditando({ ...editando, turno: e.target.value })}>
              <option value="mañana">Mañana</option>
              <option value="tarde">Tarde</option>
              <option value="noche">Noche</option>
            </select>

            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={actualizar}>Guardar</button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setEditando(null)}>Cancelar</button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Empleados