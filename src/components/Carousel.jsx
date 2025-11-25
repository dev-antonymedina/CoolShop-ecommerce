import React, { useState, useEffect } from 'react'

/* Carousel muestra un carrusel de imágenes con navegación automática */
export default function Carousel({ images = null, autoPlay = true, interval = 5000 }) {
  /* Si no se pasan imágenes, usa rutas por defecto ubicadas en /public/slides */
  const defaultImages = images && images.length
    ? images
    : ['/slides/slide1.jpg', '/slides/slide2.jpg', '/slides/slide3.jpg']

  /* Crea un array de objetos con id y src para cada imagen */
  const slides = defaultImages.map((src, i) => ({ id: i + 1, src }))

  /* Estado para controlar el índice de la imagen actual */
  const [index, setIndex] = useState(0)

  /* Función para ir a la imagen anterior (carrusel circular) */
  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length)
  }

  /* Función para ir a la siguiente imagen (carrusel circular) */
  function next() {
    setIndex((i) => (i + 1) % slides.length)
  }

  /* Autoplay: cambia la imagen automáticamente según el intervalo */
  useEffect(() => {
    if (!autoPlay) return
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval)
    return () => clearInterval(t) // limpia el intervalo al desmontar
  }, [slides.length, autoPlay, interval])

  /* Si no hay imágenes, no renderiza nada */
  if (!slides.length) return null

  return (
    <section className="cs-carousel" aria-roledescription="carousel">
      {/* Contenedor del slide actual */}
      <div className="cs-slide" aria-live="polite">
        {/* Imagen activa del carrusel */}
        <img src={slides[index].src} alt={`Slide ${index + 1}`} />
      </div>
    </section>
  )
}
