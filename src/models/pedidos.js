const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  nome: String,
  carne: String,
  pao: String,
  opcionais: [
    {
      id: Number,
      tipo: String,
    },
  ],
  bebida: String,
  porcao: String,
  status: String,
  id: Number,
});

module.exports = mongoose.model('Pedido', PedidoSchema);
