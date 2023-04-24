const express = require('express');
const mongoose = require('mongoose');
//const Router  = require('router')
const cors = require('cors');
const app = express();
const port = 3000;

const db = require('./bancoDados/bd');
app.use(cors());
app.use(express.json());
//app.use(Router());

// Conectar ao banco de dados MongoDB
mongoose.connect(db.mongoURI, { useNewUrlParser: true });
//mongoose.connect('mongodb+srv://Murilo:64Ev8wleGgPzO6Np@cluster0.f7krrms.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

// Carregar as rotas
const ingredientesRoutes = require('./src/routes/ingredientesRoutes');
const acompanhamentosRoutes = require('./src/routes/acompanhamentosRoutes');
const statusRoutes = require('./src/routes/statusRoutes');
const pedidosRoutes = require('./src/routes/pedidosRoutes');

// Registrar as rotas na aplicação
app.use('/ingredientes', ingredientesRoutes);
app.use('/acompanhamentos', acompanhamentosRoutes);
app.use('/status', statusRoutes);
app.use('/pedidos', pedidosRoutes);

app.listen(port, () => console.log(`Rodando na porta  ${port}!`));








