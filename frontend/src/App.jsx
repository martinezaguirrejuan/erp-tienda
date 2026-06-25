import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Categorias from './pages/Categorias'
import Productos from './pages/Productos'
import Clientes from './pages/Clientes'
import Proveedores from './pages/Proveedores'
import Empleados from './pages/Empleados'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
    isActive
      ? 'bg-blue-600 text-white font-semibold'
      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
  }`

function App() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <aside className="w-60 bg-slate-800 flex flex-col fixed h-full z-10">
        <div className="px-6 py-5 border-b border-slate-700">
          <h1 className="text-white font-bold text-lg">ERP Tienda</h1>
          <p className="text-slate-400 text-xs mt-1">Sistema de gestión</p>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
          <NavLink to="/productos" className={linkClass}>Inventario</NavLink>
          <NavLink to="/clientes" className={linkClass}>Clientes</NavLink>
          <NavLink to="/proveedores" className={linkClass}>Proveedores</NavLink>
          <NavLink to="/empleados" className={linkClass}>Empleados</NavLink>
          <NavLink to="/categorias" className={linkClass}>Categorías</NavLink>
        </nav>

        <div className="px-4 py-4 border-t border-slate-700">
          <p className="text-slate-400 text-xs text-center">v1.0 · ERP Local</p>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="ml-60 flex-1 flex flex-col overflow-hidden">

        {/* Navbar superior */}
        <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between shrink-0">
          <input
            type="text"
            placeholder="Buscar..."
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer">
              <span className="text-slate-500 text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
              <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
              <div className="text-xs">
                <p className="font-semibold text-slate-700">Admin</p>
                <p className="text-slate-400">Caja 1</p>
              </div>
            </div>
          </div>
        </header>

        {/* Página activa */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/empleados" element={<Empleados />} />
          </Routes>
        </main>

      </div>
    </div>
  )
}

export default App
