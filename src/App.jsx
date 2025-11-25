// Importamos React hooks y componentes necesarios
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Componentes de la interfaz
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import Footer from './components/Footer'
import ProductGroup from './components/ProductGroup'
import CheckoutPage from './components/CheckoutPage'

// Datos de productos organizados por categoría
import { hogarProducts, automotrizProducts, industrialProducts } from './data/products'

function App() {

  /* ============================================================
     ESTADO DEL CARRITO (cart)
     ------------------------------------------------------------
     - Se inicializa leyendo el contenido guardado en localStorage
     - Si no existe nada almacenado, inicia como un array vacío
     - Se usa "lazy initialization" para mejorar el rendimiento
     ============================================================ */
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = window.localStorage.getItem('cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Error reading cart from localStorage', error)
      return []
    }
  })

  /* ============================================================
     GUARDAR CARRITO EN LOCALSTORAGE
     ------------------------------------------------------------
     - Cada vez que el carrito cambia, se guarda automáticamente
     - Permite que el usuario no pierda su compra al refrescar
     ============================================================ */
  useEffect(() => {
    try {
      window.localStorage.setItem('cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Error saving cart to localStorage', error)
    }
  }, [cart])

  /* ============================================================
     FUNCIÓN: addToCart(product)
     ------------------------------------------------------------
     - Si el producto ya existe, incrementa su cantidad
     - Si no existe, lo agrega al carrito con cantidad inicial = 1
     ============================================================ */
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id)

      if (existingProduct) {
        // Actualizar cantidad
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      // Agregar nuevo producto
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  /* ============================================================
     FUNCIÓN: removeFromCart(productId)
     ------------------------------------------------------------
     - Elimina completamente un producto del carrito
     ============================================================ */
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  /* ============================================================
     FUNCIÓN: clearCart()
     ------------------------------------------------------------
     - Vacía por completo el carrito
     ============================================================ */
  const clearCart = () => {
    setCart([])
  }

  /* ============================================================
     CALCULAR CANTIDAD TOTAL DE ARTÍCULOS Y TOTAL EN $
     ------------------------------------------------------------
     cartCount = suma de cantidades
     cartTotal = suma de (precio * cantidad)
     ============================================================ */
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    /* ============================================================
       SISTEMA DE RUTAS DE LA APLICACIÓN
       ------------------------------------------------------------
       <Router> envuelve toda la app para permitir navegación
       ============================================================ */
    <Router>
      
      {/* Barra de navegación: recibe datos del carrito */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        cartItems={cart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />

      {/* Carrusel de imágenes principal */}
      <Carousel />

      {/* Rutas principales */}
      <Routes>

        {/* Página principal "/" */}
        <Route
          path="/"
          element={
            <main className="cs-container">

              {/* Secciones de productos por categoría */}
              <ProductGroup
                id="hogar"
                title="🏠 Hogar"
                products={hogarProducts}
                onAddToCart={addToCart}
              />

              <ProductGroup
                id="automotriz"
                title="🚗 Automotriz"
                products={automotrizProducts}
                onAddToCart={addToCart}
              />

              <ProductGroup
                id="industrial"
                title="🏭 Industrial"
                products={industrialProducts}
                onAddToCart={addToCart}
              />
            </main>
          }
        />

        {/* Página de checkout */}
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cartItems={cart}
              cartTotal={cartTotal}
              clearCart={clearCart}
            />
          }
        />
      </Routes>

      {/* Footer de toda la aplicación */}
      <Footer />
    </Router>
  )
}

export default App
