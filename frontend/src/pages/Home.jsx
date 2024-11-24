import React, { useEffect } from 'react';
import api from '../services/api';

const Home = () => {
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await api.get('/');
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao conectar ao backend:', error);
      }
    };

    fetchApi();
  }, []);

  return <h1>Bem-vindo ao E-commerce de Bebidas</h1>;
};

export default Home;
