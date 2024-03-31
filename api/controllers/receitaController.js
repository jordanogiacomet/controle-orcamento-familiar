const ReceitaService = require('../services/receitaService');

const receitaService = new ReceitaService();

class ReceitaController {
  static async cadastrarReceita(req, res) {
    const {descricao, valor, data} = req.body;

    try {
      const receita = await receitaService
          .cadastrarReceita({descricao, valor, data});
      return res.status(201).json(receita);
    } catch (error) {
      return res.status(400).send({message: error.message});
    }
  }
  static async pegarTodasAsReceitas(req, res) {
    try {
      const receitas = await receitaService.pegarTodasAsReceitas();

      return res.status(200).json(receitas);
    } catch (error) {
      return res.status(400).send({message: error.message});
    }
  }
  static async pegarReceitaPeloId(req, res) {
    const {params} = req;

    try {
      const resultado = await receitaService.pegarReceitaPeloId(params.id);
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async deletaReceitaPeloId(req, res) {
    const {params} = req;

    try {
      const excluir = await receitaService.deletarReceitaPeloId(params.id);
      return res.status(200).json(excluir);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = ReceitaController;
