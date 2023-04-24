const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedidos');

router.get('/', async (req, res) => {
  const pedidos = await Pedido.find();
  res.json({ pedidos });
});

router.post('/', async (req, res) => {
  const pedido = new Pedido(req.body);
  await pedido.save();
  res.json({ message: 'Pedido adicionado com sucesso!' });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  await Pedido.findByIdAndUpdate(id, req.body);
  res.json({ message: 'Pedido atualizado com sucesso!' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Pedido.findByIdAndDelete(id);
  res.json({ message: 'Pedido excluído com sucesso!' });
});

module.exports = router;
