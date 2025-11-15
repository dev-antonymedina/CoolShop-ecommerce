import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import Footer from './components/Footer'
import ProductGroup from './components/ProductGroup'
import CheckoutPage from './components/CheckoutPage' // New component
import { hogarProducts, automotrizProducts, industrialProducts } from './data/products'

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = window.localStorage.getItem('cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Error reading cart from localStorage', error)
      return []
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem('cart', JSON.stringify(cart))
    } catch (error) {
      console.error('Error saving cart to localStorage', error)
    }
  }, [cart])

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id)
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <Router>
      <Navbar cartCount={cartCount} cartTotal={cartTotal} cartItems={cart} removeFromCart={removeFromCart} clearCart={clearCart} />
      <Carousel />

      <Routes>
        <Route path="/" element={
          <main className="cs-container">
            <ProductGroup id="hogar" title="🏠 Hogar" products={hogarProducts} onAddToCart={addToCart} />
            <ProductGroup id="automotriz" title="🚗 Automotriz" products={automotrizProducts} onAddToCart={addToCart} />
            <ProductGroup id="industrial" title="🏭 Industrial" products={industrialProducts} onAddToCart={addToCart} />
          </main>
        } />
        <Route 
          path="/checkout" 
          element={<CheckoutPage cartItems={cart} cartTotal={cartTotal} clearCart={clearCart} />} 
        />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App

