const express = require('express');
const { createOrder, listOrders, updateOrderStatus } = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/', authMiddleware, createOrder);

router.get('/', authMiddleware, listOrders);

router.put('/:orderId', authMiddleware, async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso restrito a administradores' });
    }

    order.status = status; 
    await order.save();

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o status do pedido' });
  }
});

module.exports = router;
