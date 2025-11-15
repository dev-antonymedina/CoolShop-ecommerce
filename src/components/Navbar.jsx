import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ cartCount, cartTotal, cartItems, removeFromCart, clearCart }) {
  const [isCartVisible, setIsCartVisible] = useState(false);

  return (
    <header className="cs-navbar">
      <div className="cs-container">
        <div className="cs-brand" href="/">CoolShop</div>
        <nav className="cs-nav">
          <a href="/">Inicio</a>
          <a href="/#hogar">Hogar</a>
          <a href="/#automotriz">Automotriz</a>
          <a href="/#industrial">Industrial</a>
        </nav>
        <div className="cs-cart">
          <button className="cs-cart-btn" onClick={() => setIsCartVisible(!isCartVisible)}>
            Ver orden 🛒 ({cartCount})
          </button>
          {isCartVisible && (
            <div className="cs-cart-dropdown">
              {cartItems && cartItems.length > 0 ? (
                <>
                  <ul>
                    {cartItems.map(item => (
                      <li key={item.id}>
                        <span>{item.name} ({item.quantity}) - ${item.price * item.quantity}</span>
                        <button onClick={() => removeFromCart(item.id)} className="cs-remove-item-btn">❌</button>
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <p>Total: ${cartTotal.toFixed(2)}</p>
                  <div className="cs-cart-actions">
                    <button onClick={clearCart} className="cs-clear-cart-btn">Vaciar Carrito 🗑</button>
                    <Link to="/checkout" className="cs-pay-btn" onClick={() => setIsCartVisible(false)}>  Pagar</Link>
                  </div>
                </>
              ) : (
                <p>El carrito está vacío</p>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
