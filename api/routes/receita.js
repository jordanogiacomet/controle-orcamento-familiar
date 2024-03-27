const {Router} = require('express');

const ReceitaController = require('../controllers/receitaController');

const router = Router();

router
    .get('/receita', ReceitaController.pegaTodasAsReceitas)
    .post('/receita', ReceitaController.cadastrar);

module.exports = router;
