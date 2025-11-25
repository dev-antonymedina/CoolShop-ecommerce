import React from 'react'
import ProductCard from './ProductCard'

/* ProductGroup muestra un grupo de productos con un título y un grid responsive */
export default function ProductGroup({ id, title, products, onAddToCart }) {
  return (
    /* Sección identificada para navegación por anclas (#id) */
    <section id={id} className="cs-product-group">
      <div className="cs-group-inner">
        
        {/* Título del grupo (Hogar, Automotriz, Industrial, etc.) */}
        <h2 className="cs-group-title">{title}</h2>

        {/* Grid que muestra todas las tarjetas de productos */}
        <div className="cs-products-grid">
          {products.map((product) => (
            /* Renderiza cada producto usando ProductCard */
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
