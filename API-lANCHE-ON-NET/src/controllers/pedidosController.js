const Pedido = require('../models/pedidos');
const Combo = require('../models/combos');

module.exports = {
  async create(req, res) {
    const { nome, carne, pao, opcionais, bebida, porcao, status, comboId, descricaoCombo } = req.body;

    try {
      const combo = await Combo.findById(comboId);

      if (!combo) {
        return res.status(400).json({ error: 'Combo não encontrado.' });
      }

      
        const pedido = await Pedido.create({ 
        nome,
        descricao: descricaoCombo || combo.descricao, 
        carne, 
        pao, 
        opcionais, 
        bebida, 
        porcao, 
        status, 
        combo: { nome: combo.nome, id: combo._id, descricaoCombo },
        numeroPedido
      });

      return res.json({ pedido, message: 'Pedido criado com sucesso.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao criar o pedido.' });
    }
  },

  async update(req, res) {
    const { id } = req.params;

    try {
      const pedido = await Pedido.findByIdAndUpdate(id, { ...req.body }, { new: true });
      return res.json({ pedido, message: 'Pedido atualizado com sucesso.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao atualizar o pedido.' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const pedido = await Pedido.findById(id);

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }

      await Pedido.findByIdAndDelete(id);

      return res.json({ message: 'Pedido excluído com sucesso.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao excluir o pedido.' });
    }
  }
};
