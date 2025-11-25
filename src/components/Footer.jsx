import React from 'react'

/* Footer simple para mostrar derechos y enlaces */
export default function Footer() {
  return (
    /* Contenedor principal del pie de página */
    <footer className="cs-footer">
      <div className="cs-container">
        
        {/* Año actual dinámico y nombre del sitio */}
        <div>© {new Date().getFullYear()} CoolShop</div>

        {/* Enlaces informativos del footer */}
        <div className="cs-footer-links">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
          <a href="#">Soporte</a>
        </div>
      </div>
    </footer>
  )
}
