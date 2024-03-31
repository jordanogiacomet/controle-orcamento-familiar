const {Router} = require('express');

const ReceitaController = require('../controllers/receitaController');

const router = Router();

router
    .get('/receitas', ReceitaController.pegarTodasAsReceitas)
    .get('/receitas/:id', ReceitaController.pegarReceitaPeloId)
    .post('/receitas', ReceitaController.cadastrarReceita)
    .delete('/receitas/:id', ReceitaController.deletaReceitaPeloId);

module.exports = router;
