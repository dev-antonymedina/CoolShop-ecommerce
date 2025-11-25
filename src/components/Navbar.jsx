import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/* Navbar con enlaces y un carrito desplegable */
export default function Navbar({ cartCount, cartTotal, cartItems, removeFromCart, clearCart }) {
  /* Estado para mostrar/ocultar el carrito */
  const [isCartVisible, setIsCartVisible] = useState(false);

  return (
    <header className="cs-navbar">
      <div className="cs-container">

        {/* Marca / título del sitio */}
        <div className="cs-brand" href="/">CoolShop</div>

        {/* Navegación principal por secciones */}
        <nav className="cs-nav">
          <a href="/">Inicio</a>
          <a href="/#hogar">Hogar</a>
          <a href="/#automotriz">Automotriz</a>
          <a href="/#industrial">Industrial</a>
        </nav>

        {/* Contenedor del carrito */}
        <div className="cs-cart">
          {/* Botón para abrir/cerrar el dropdown del carrito */}
          <button className="cs-cart-btn" onClick={() => setIsCartVisible(!isCartVisible)}>
            Ver orden 🛒 ({cartCount})
          </button>

          {/* Dropdown del carrito, solo se muestra si isCartVisible es true */}
          {isCartVisible && (
            <div className="cs-cart-dropdown">

              {/* Si hay productos en el carrito */}
              {cartItems && cartItems.length > 0 ? (
                <>
                  <ul>
                    {/* Lista de productos del carrito */}
                    {cartItems.map(item => (
                      <li key={item.id}>
                        <span>{item.name} ({item.quantity}) - ${item.price * item.quantity}</span>

                        {/* Quitar producto del carrito */}
                        <button onClick={() => removeFromCart(item.id)} className="cs-remove-item-btn">
                          ❌
                        </button>
                      </li>
                    ))}
                  </ul>

                  <hr />

                  {/* Total del carrito */}
                  <p>Total: ${cartTotal.toFixed(2)}</p>

                  {/* Acciones del carrito: vaciar y pagar */}
                  <div className="cs-cart-actions">
                    <button onClick={clearCart} className="cs-clear-cart-btn">Vaciar Carrito 🗑</button>

                    {/* Link hacia el checkout, cierra el dropdown al hacer clic */}
                    <Link to="/checkout" className="cs-pay-btn" onClick={() => setIsCartVisible(false)}>
                      Pagar
                    </Link>
                  </div>
                </>
              ) : (
                /* Mensaje cuando no hay productos */
                <p>El carrito está vacío</p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
