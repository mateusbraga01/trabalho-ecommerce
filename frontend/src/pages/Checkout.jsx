import React, { useEffect, useState } from 'react';
import '../styles/global.css'

const Checkout = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    localStorage.removeItem('cart');
    setCart([]);
    alert("Compra finalizada com sucesso!");
  };

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Itens no Carrinho:</h2>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - R${item.price} x {item.quantity}
              <button onClick={() => handleIncreaseQuantity(index)}>+</button>
              <button onClick={() => handleDecreaseQuantity(index)}>-</button>
              <button onClick={() => handleRemoveItem(index)}>Remover</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: R${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
      <button onClick={handleCheckout}>Finalizar Compra</button>
    </div>
  );
};

export default Checkout;
