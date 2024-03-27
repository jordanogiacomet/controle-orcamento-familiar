require('@jest/globals');
const ReceitaService = require('../../services/receitaService.js');
const receitaService = new ReceitaService();

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
  it('Nao se pode cadastrar uma receita duplicada no mesmo mes;', async () => {
    const receitaMock = {
      descricao: 'Salario',
      valor: 'R$ 200,00',
      data: '2023-01-01',
    };
    receitaService.cadastrarReceita(receitaMock);

    const receitaMockDuplicada = {
      descricao: 'Salario',
      valor: 'R$ 200,00',
      data: '2023-01-01',
    };
    const receitaDuplicada = receitaService
        .cadastrarReceita(receitaMockDuplicada);

    await expect(receitaDuplicada)
        .rejects
        .toThrowError('Não é possível cadastrar duas receitas com a mesma descrição no mesmo mês;');
  });
});
