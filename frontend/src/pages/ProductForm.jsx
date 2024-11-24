import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/global.css'

const ProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/products/${id}`)
        .then(response => {
          const product = response.data;
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setStock(product.stock);
        })
        .catch(error => {
          console.error("Erro ao buscar produto para edição:", error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = { name, description, price, stock };

    if (id) {
      axios.put(`http://localhost:3000/api/products/${id}`, productData)
        .then(() => {
          navigate('/admin');
        })
        .catch(error => {
          console.error("Erro ao atualizar produto:", error);
        });
    } else {
      axios.post('http://localhost:3000/api/products/create', productData)
        .then(() => {
          navigate('/admin');
        })
        .catch(error => {
          console.error("Erro ao criar produto:", error);
        });
    }
  };

  return (
    <div>
      <h1>{id ? 'Editar Produto' : 'Adicionar Produto'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Descrição:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Preço:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Estoque:</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default ProductForm;
