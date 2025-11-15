import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './CheckoutPage.css';

const CheckoutPage = ({ cartItems, cartTotal, clearCart }) => {
  const form = useRef();
  const orderSummaryRef = useRef();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prevCustomer => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = 'service_iixtos5';
    const templateID = 'template_48cbdln';
    const userID = 'BMFkWmSnTRg6x9mBM';

    // 1. Enviar correo de confirmación simple
    const templateParams = {
      name: customer.name,
      email: customer.email,
      // Ya no se envía el PDF en el correo
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then(async (result) => {
          console.log(result.text);

          // 2. Generar y mostrar el PDF en pantalla
          const canvas = await html2canvas(orderSummaryRef.current);
          const imgData = canvas.toDataURL('image/png');

          const doc = new jsPDF();
          doc.text('COOLSHOP', 20, 10);
          doc.text('Factura de Compra', 20, 20);
          doc.text(`Nombre: ${customer.name}`, 20, 30);
          doc.text(`Email: ${customer.email}`, 20, 40);
          doc.text(`Dirección: ${customer.address}`, 20, 50);
          doc.addImage(imgData, 'PNG', 20, 60, 170, 0);
          doc.output('dataurlnewwindow');


          alert('¡Pedido realizado con éxito! Tu factura se ha abierto en una nueva pestaña.');
          clearCart();
      }, (error) => {
          console.log(error.text);
          alert('Hubo un error al realizar el pedido. Por favor, inténtalo de nuevo.');
      });
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <div className="customer-details">
          <h2>Tus Datos</h2>
          <form ref={form} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={customer.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={customer.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                value={customer.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn-place-order">Realizar Pedido</button>
          </form>
        </div>
        <div className="order-summary" ref={orderSummaryRef}>
          <h2>Resumen de tu compra</h2>
          {cartItems.length === 0 ? (
            <p>No hay productos en tu carrito.</p>
          ) : (
            <>
              <ul>
                {cartItems.map(item => (
                  <li key={item.id}>
                    <span>{item.name} (x${item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="total">
                <strong>Total: ${cartTotal.toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
