/* eslint-disable max-len */
const database = require('../db/models');
const uuid = require('uuid');


class ReceitaService {
  async cadastrarReceita(dto) {
    try {
      if (!dto.descricao) {
        throw new Error('A descricao da receita e obrigatoria;');
      }
      if (!dto.valor) {
        throw new Error('O valor da receita e obrigatorio;');
      }
      if (!dto.data) {
        throw new Error('A data da receita e obrigatoria;');
      }

      const dataReceita = new Date(dto.data);
      const primeiroDiaMes = new Date(dataReceita.getFullYear(), dataReceita.getMonth(), 1);
      const ultimoDiaMes = new Date(dataReceita.getFullYear(), dataReceita.getMonth() + 1, 0);

      const receitaExistente = await database.Receita.findOne({
        where: {
          descricao: dto.descricao,
          data: {
            [database.Sequelize.Op.gte]: primeiroDiaMes,
            [database.Sequelize.Op.lte]: ultimoDiaMes,
          },
        },
      });

      if (receitaExistente) {
        throw new Error('Não é possível cadastrar duas receitas com a mesma descrição no mesmo mês;');
      }

      const novaReceita = await database.Receita.create({
        id: uuid.v4(),
        descricao: dto.descricao,
        valor: dto.valor,
        data: dto.data,
      });

      return novaReceita;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async pegaTodasAsReceitas() {
    const receitas = await database.Receita.findAll();

    return receitas;
  }
}

module.exports = ReceitaService;
