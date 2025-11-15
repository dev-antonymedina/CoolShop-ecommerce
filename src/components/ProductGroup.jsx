import React from 'react'
import ProductCard from './ProductCard'

/* ProductGroup muestra un grupo de productos con título y grid de 3 columnas */
export default function ProductGroup({ id, title, products, onAddToCart }) {
  return (
    <section id={id} className="cs-product-group">
      <div className="cs-group-inner">
        <h2 className="cs-group-title">{title}</h2>
        <div className="cs-products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}
