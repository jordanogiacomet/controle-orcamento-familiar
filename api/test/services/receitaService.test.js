/* eslint-disable max-len */
const ReceitaService = require('../../services/receitaService.js');
const receitaService = new ReceitaService();
const {describe} = require('@jest/globals');

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
});
