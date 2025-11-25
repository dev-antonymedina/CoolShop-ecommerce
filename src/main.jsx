import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Busca el elemento root en el HTML y crea el punto de montaje de React
createRoot(document.getElementById('root')).render(
  // StrictMode ayuda a detectar errores y prácticas no recomendadas (solo en desarrollo)
  <StrictMode>
    {/* Renderiza el componente principal de la aplicación */}
    <App />
  </StrictMode>,
)
