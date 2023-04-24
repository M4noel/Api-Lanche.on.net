const Pedido = require('../models/pedidos');

module.exports = {
  async index(req, res) {
    try {
      const pedidos = await Pedido.find();
      return res.json({ pedidos });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar os pedidos.' });
    }
  },

  async create(req, res) {
    const { nome, carne, pao, opcionais, bebida, porcao, status } = req.body;

    try {
      const pedido = await Pedido.create({ nome, carne, pao, opcionais, bebida, porcao, status });
      return res.json({ pedido, message: 'Pedido criado com sucesso.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao criar o pedido.' });
    }
  },

  async update(req, res) {
    const { id } = req.params;

    try {
      const pedido = await Pedido.findByIdAndUpdate(id, req.body, { new: true });
      return res.json({ pedido, message: 'Pedido atualizado com sucesso.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao atualizar o pedido.' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      await Pedido.findByIdAndDelete(id);
      return res.json({ message: 'Pedido excluído com sucesso.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao excluir o pedido.' });
    }
  },
};
