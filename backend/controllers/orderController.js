const { Order, OrderItem, Product } = require('../models');

const createOrder = async (req, res) => {
  const { cartItems } = req.body;
  const userId = req.user.id;

  try {
    let total = 0;
    const items = [];
    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      total += product.price * item.quantity;
      items.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const order = await Order.create({
      userId,
      status: 'Aguardando Pagamento',
      total,
    });

    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o pedido.' });
  }
};

const listOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.findAll({
      where: { userId },
      include: {
        model: OrderItem,
        include: {
          model: Product,
        },
      },
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar pedidos.' });
  }
};

module.exports = { createOrder, listOrders };
