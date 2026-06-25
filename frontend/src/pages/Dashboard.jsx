function Dashboard() {
  const ventas = [
    { id: 'F-001', cliente: 'Juan Pérez', total: '$85.000', estado: 'Pagado' },
    { id: 'F-002', cliente: 'María López', total: '$120.000', estado: 'Pagado' },
    { id: 'F-003', cliente: 'Carlos Ruiz', total: '$47.500', estado: 'Pagado' },
    { id: 'F-004', cliente: 'Ana Torres', total: '$210.000', estado: 'Pagado' },
    { id: 'F-005', cliente: 'Pedro Gómez', total: '$63.000', estado: 'Pagado' },
  ]

  const semana = [
    { dia: 'Lun', valor: 60 },
    { dia: 'Mar', valor: 80 },
    { dia: 'Mié', valor: 45 },
    { dia: 'Jue', valor: 90 },
    { dia: 'Vie', valor: 70 },
    { dia: 'Sáb', valor: 100 },
    { dia: 'Dom', valor: 55 },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
          <p className="text-sm text-slate-500 mb-1">Ventas del Día</p>
          <p className="text-3xl font-bold text-slate-800">$1.250.000</p>
          <p className="text-xs text-slate-400 mt-2">COP · Hoy</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
          <p className="text-sm text-slate-500 mb-1">Stock Bajo</p>
          <p className="text-3xl font-bold text-red-600">8</p>
          <p className="text-xs text-red-400 mt-2">Productos por agotarse</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <p className="text-sm text-slate-500 mb-1">Facturas Hoy</p>
          <p className="text-3xl font-bold text-slate-800">24</p>
          <p className="text-xs text-slate-400 mt-2">Transacciones registradas</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Gráfica semanal */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-600 mb-4">Rendimiento de Ventas — Esta Semana</h3>
          <div className="flex items-end gap-3 h-32">
            {semana.map(({ dia, valor }) => (
              <div key={dia} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${valor}%` }}
                />
                <span className="text-xs text-slate-400">{dia}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Últimas ventas */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-slate-600 mb-4">Últimas Ventas Realizadas</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b">
                <th className="pb-2">ID</th>
                <th className="pb-2">Cliente</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map(v => (
                <tr key={v.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-2 text-slate-500">{v.id}</td>
                  <td className="py-2">{v.cliente}</td>
                  <td className="py-2 font-medium">{v.total}</td>
                  <td className="py-2">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                      {v.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
