// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/product/${id}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error('Erro ao deletar produto:', error);
      });
  };

  return (
    <div className="admin-dashboard">
      <h1>Painel de Administração</h1>
      <button onClick={() => navigate('/admin/product')}>Adicionar Produto</button>
      <h2>Lista de Bebidas</h2>
      <div>
        {products.map((product) => (
          <div key={product.id} className="admin-product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Preço: R$ {product.price}</p>
            <button onClick={() => handleEdit(product.id)}>Editar</button>
            <button onClick={() => handleDelete(product.id)}>Deletar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
