import Categorias from './pages/Categorias'
import Productos from './pages/Productos'
import Clientes from './pages/Clientes'
import { Routes, Route, Link } from 'react-router-dom'
import Proveedores from './pages/Proveedores'
function App() {
  return (
    <div>
      <nav>
        <Link to="/categorias">Categorías</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/clientes">Clientes</Link>
        <Link to="/proveedores">Proveedores</Link>
      </nav>
      <Routes>
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/proveedores" element={<Proveedores />} />
      </Routes>
    </div>
  )
}

export default App
