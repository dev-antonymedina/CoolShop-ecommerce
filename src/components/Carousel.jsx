import React, { useState, useEffect } from 'react'
/* Carousel muestra un carrusel de imágenes con navegación automática */
export default function Carousel({ images = null, autoPlay = true, interval = 5000 }) {
  // rutas por defecto (intenta /slides/slide1.jpg, slide2, slide3 en public/)
  const defaultImages = images && images.length
    ? images
    : ['/slides/slide1.jpg', '/slides/slide2.jpg', '/slides/slide3.jpg']

  const slides = defaultImages.map((src, i) => ({ id: i + 1, src }))
  const [index, setIndex] = useState(0)

  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length)
  }

  function next() {
    setIndex((i) => (i + 1) % slides.length)
  }

  useEffect(() => {
    if (!autoPlay) return
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval)
    return () => clearInterval(t)
  }, [slides.length, autoPlay, interval])

  if (!slides.length) return null

  return (
    <section className="cs-carousel" aria-roledescription="carousel">
      <div className="cs-slide" aria-live="polite">
        <img src={slides[index].src} alt={`Slide ${index + 1}`} />
      </div>
    </section>
  )
}
