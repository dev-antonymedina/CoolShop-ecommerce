import React from 'react';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="cs-product-card">
      <div className="cs-product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="cs-product-info">
        <h3>{product.name}</h3>
        <p className="cs-product-description">{product.description}</p>
        <p className="cs-product-price">${product.price}</p>
        <button className="cs-product-btn" onClick={() => onAddToCart(product)}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
