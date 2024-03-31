/* eslint-disable max-len */
const database = require('../db/models');
const moment = require('moment');
const uuid = require('uuid');
const conversorDeData = require('../utils/dataUtils.js');


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

      const dataReceita = moment(conversorDeData(dto.data));

      const primeiroDiaMes = dataReceita.clone().startOf('month');
      const ultimoDiaMes = dataReceita.clone().endOf('month');

      const receitaExistente = await database.Receita.findOne({
        where: {
          descricao: dto.descricao,
          data: {
            [database.Sequelize.Op.gte]: primeiroDiaMes.toDate(),
            [database.Sequelize.Op.lte]: ultimoDiaMes.toDate(),
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
        data: dataReceita,
      });


      return novaReceita;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async pegarTodasAsReceitas() {
    const receitas = await database.Receita.findAll();

    return receitas;
  }
  async pegarReceitaPeloId(id) {
    const receita = await database.Receita.findOne({
      where: {
        id: id,
      },
    });
    if (!receita) {
      throw new Error('Receita informada não cadastrada!');
    }
    return receita;
  }
  async deletarReceitaPeloId(id) {
    await this.pegarReceitaPeloId(id);

    try {
      await database.Receita.destroy({
        where: {
          id: id,
        },
      });
      return {message: 'Receita excluida'};
    } catch (error) {
      throw new Error('Erro ao tentar deletar a receita');
    }
  }
}

module.exports = ReceitaService;
