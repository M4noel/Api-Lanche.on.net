const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedidos');

router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    return res.json({ pedidos });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar os pedidos.' });
  }
});

router.post('/', async (req, res) => {
  const { nome, carne, pao, opcionais, bebida, porcao, status, comboId, descricaoCombo, numeroPedido } = req.body;

  try {
    const pedido = await Pedido.create({ nome, carne, pao, opcionais, bebida, porcao, status, combo: { nome: comboId, descricao: descricaoCombo }, descricaoCombo, numeroPedido });
    return res.json({ pedido, message: 'Pedido criado com sucesso.' });
  } catch (err) {
    return res.status(400).json({ error: 'Erro ao criar o pedido.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, carne, pao, opcionais, bebida, porcao, status, comboId, descricaoCombo, numeroPedido } = req.body;

  try {
    const pedido = await Pedido.findByIdAndUpdate(id, { nome, carne, pao, opcionais, bebida, porcao, status, combo: { nome: comboId, descricao: descricaoCombo }, descricaoCombo, numeroPedido }, { new: true });
    return res.json({ pedido, message: 'Pedido atualizado com sucesso.' });
  } catch (err) {
    return res.status(400).json({ error: 'Erro ao atualizar o pedido.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Pedido.findByIdAndDelete(id);
    return res.json({ message: 'Pedido excluído com sucesso.' });
  } catch (err) {
    return res.status(400).json({ error: 'Erro ao excluir o pedido.' });
  }
});

module.exports = router;

