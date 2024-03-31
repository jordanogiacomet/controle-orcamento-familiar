const {Router} = require('express');

const ReceitaController = require('../controllers/receitaController');

const router = Router();

router
    .get('/receitas', ReceitaController.pegaTodasAsReceitas)
    .post('/receitas', ReceitaController.cadastrarReceita);

module.exports = router;
