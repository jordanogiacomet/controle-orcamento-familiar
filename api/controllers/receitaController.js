const ReceitaService = require('../services/receitaService');

const receitaService = new ReceitaService();

class ReceitaController {
  static async cadastrar(req, res) {
    const {descricao, valor, data} = req.body;

    try {
      const receita = await receitaService
          .cadastrarReceita({descricao, valor, data});
      return res.status(201).json(receita);
    } catch (error) {
      return res.status(400).send({message: error.message});
    }
  }
  static async pegaTodasAsReceitas(req, res) {
    const receitas = await receitaService.pegaTodasAsReceitas();

    return res.status(200).json(receitas);
  }
}

module.exports = ReceitaController;
