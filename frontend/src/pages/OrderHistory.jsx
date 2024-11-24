// frontend/src/pages/OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/orders', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar histórico de pedidos:', error);
      });
  }, []);

  return (
    <div>
      <h1>Histórico de Pedidos</h1>
      {orders.length === 0 ? (
        <p>Você ainda não fez nenhum pedido.</p>
      ) : (
        <div className="order-history">
          {orders.map((order) => (
            <div key={order.id} className="order-item">
              <h3>Pedido #{order.id}</h3>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Data:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> R${order.total}</p>
              
              <h4>Itens do Pedido:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item.productId}>
                    {item.name} - R${item.price} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
