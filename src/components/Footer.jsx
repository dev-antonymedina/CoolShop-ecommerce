import React from 'react'

export default function Footer() {
  return (
    <footer className="cs-footer">
      <div className="cs-container">
        <div>© {new Date().getFullYear()} CoolShop</div>
        <div className="cs-footer-links">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
          <a href="#">Soporte</a>
        </div>
      </div>
    </footer>
  )
}
