import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/global.css'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar produtos:', error);
      });

    axios.get('http://localhost:3000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar categorias:', error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.split(',');
    setPriceRange([parseInt(value[0]), parseInt(value[1])]);
  };

  useEffect(() => {
    const filtered = products.filter(product => {
      const isInCategory = category ? product.category === category : true;
      const isInPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      return isInCategory && isInPriceRange;
    });
    setFilteredProducts(filtered);
  }, [category, priceRange, products]);

  const addToCart = (product) => {
    if (product.stock > 0) {
      setCart((prevCart) => {
        const existingProductIndex = prevCart.findIndex(item => item.id === product.id);

        if (existingProductIndex >= 0) {
          const newCart = [...prevCart];
          newCart[existingProductIndex].quantity += 1;
          localStorage.setItem('cart', JSON.stringify(newCart));
          return newCart;
        } else {
          const newCart = [...prevCart, { ...product, quantity: 1 }];
          localStorage.setItem('cart', JSON.stringify(newCart));
          return newCart;
        }
      });

      const updatedProducts = products.map(prod =>
        prod.id === product.id ? { ...prod, stock: prod.stock - 1 } : prod
      );
      setProducts(updatedProducts);
    } else {
      alert("Estoque insuficiente para este produto!");
    }
  };

  return (
    <div className="product-list-page">
      <h1>Produtos</h1>

      <div className="filters">
        <div className="filter">
          <label>Categoria:</label>
          <select onChange={handleCategoryChange} value={category}>
            <option value="">Todas</option>
            {categories.length > 0 ? (
              categories.map(cat => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option value="">Nenhuma categoria disponível</option>
            )}
          </select>
        </div>

        <div className="filter">
          <label>Preço:</label>
          <select onChange={handlePriceChange}>
            <option value="0,1000">Até R$1000</option>
            <option value="0,100">Até R$100</option>
            <option value="100,500">R$100 a R$500</option>
            <option value="500,1000">R$500 a R$1000</option>
            <option value="1000,10000">Acima de R$1000</option>
          </select>
        </div>
      </div>

      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Preço: R${product.price}</p>
              <p>Estoque: {product.stock} unidades</p>
              <button onClick={() => addToCart(product)} disabled={product.stock === 0}>
                {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Sem Estoque'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
