require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const db = require('./models');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);

db.sequelize.sync()
  .then(() => console.log('Banco de dados sincronizado.'))
  .catch(err => console.error('Erro ao sincronizar o banco de dados:', err));

app.get('/', (req, res) => {
  res.send('API E-commerce de Bebidas Funcionando!');
});

app.get('/api/orders', (req, res) => {
    const userId = req.user.id; 
    
    const orders = db.orders.filter(order => order.userId === userId);
    
    res.json(orders);
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
