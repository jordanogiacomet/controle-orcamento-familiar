/* eslint-disable max-len */
const ReceitaService = require('../../services/receitaService.js');
const receitaService = new ReceitaService();
const {describe, expect} = require('@jest/globals');
const database = require('../../db/models');
const converterParaISO = require('../../utils/dataUtils.js');
const moment = require('moment');


describe('Testando receitaService', () => {
  it('A receita deve possuir descricao, valor e data;', async () => {
    const receitaMock = {
      descricao: 'Salario',
      valor: 'R$ 200,00',
    };
    const receitaSalva = receitaService.cadastrarReceita(receitaMock);

    await expect(receitaSalva)
        .rejects
        .toThrowError('A data da receita e obrigatoria;');
  });
  it('Não é possível cadastrar duas receitas com a mesma descrição no mesmo mês;', async () => {
    const receitaMock = {
      descricao: 'Salario',
      valor: 'R$ 200,00',
      data: '01-01-2023',
    };
    const receitaSalva = await receitaService.cadastrarReceita(receitaMock);

    await expect(async () => {
      await receitaService.cadastrarReceita(receitaMock);
    }).rejects.toThrowError('Não é possível cadastrar duas receitas com a mesma descrição no mesmo mês;');
    await receitaService.deletarReceitaPeloId(receitaSalva.id);
  });
  it('Ao cadastrar um usuário, validar o retorno das informações do usuário.', async () => {
    const receitaMock = {
      descricao: 'Mesada',
      valor: 'R$ 100,00',
      data: '01-01-2023',
    };

    const receitaSalva = await receitaService.cadastrarReceita(receitaMock);
    const retornado = await receitaService.pegarReceitaPeloId(receitaSalva.id);

    expect(retornado).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          descricao: receitaMock.descricao,
          valor: receitaMock.valor,
          data: expect.any(Date),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
    );
    await receitaService.deletarReceitaPeloId(receitaSalva.id);
  });
  it('Deve retornar todas as receitas.', async () => {
    await database.Receita.bulkCreate([
      {descricao: 'Mesada', valor: 'R$ 150,00', data: moment(converterParaISO('2023-01-07'))},
      {descricao: 'Salário', valor: 'R$ 200,00', data: moment(converterParaISO('2023-01-07'))},
    ]);

    const receitas = await receitaService.pegarTodasAsReceitas();

    expect(receitas.length).toBe(2);
    expect(receitas[0].descricao).toBe('Mesada');
    expect(receitas[1].descricao).toBe('Salário');

    await receitaService.deletarReceitaPeloId(receitas[0].id);
    await receitaService.deletarReceitaPeloId(receitas[1].id);
  });
});
