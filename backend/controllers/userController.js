const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const userController = {
  register: async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'cliente',
      });

      res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar o usuário.' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) return res.status(401).json({ error: 'Senha incorreta.' });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.status(200).json({ message: 'Login bem-sucedido!', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao realizar login.' });
    }
  },
};

module.exports = userController;
