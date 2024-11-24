import React from 'react';
import './styles/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import AdminDashboard from './pages/AdminDashboard';
import ProductForm from './pages/ProductForm';
import Checkout from './pages/Checkout';

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <ul>
              <li><a href="/register">Cadastro</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/products">Produtos</a></li>
              <li><a href="/checkout">Carrinho</a></li>
              <li><a href="/admin">Dashboard</a></li>
              <li><a href="/admin/product">Admin-Adicionar Produto</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/product" element={<ProductForm />} />
            <Route path="/admin/product/:id" element={<ProductForm />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
