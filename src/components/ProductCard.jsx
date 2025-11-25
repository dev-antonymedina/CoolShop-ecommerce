import React from 'react';

/* Tarjeta individual que muestra un producto y permite agregarlo al carrito */
export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="cs-product-card">

      {/* Imagen del producto */}
      <div className="cs-product-image">
        <img src={product.image} alt={product.name} />
      </div>

      {/* Información del producto */}
      <div className="cs-product-info">
        <h3>{product.name}</h3>

        {/* Descripción corta del producto */}
        <p className="cs-product-description">{product.description}</p>

        {/* Precio del producto */}
        <p className="cs-product-price">${product.price}</p>

        {/* Botón para agregar al carrito */}
        <button className="cs-product-btn" onClick={() => onAddToCart(product)}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
