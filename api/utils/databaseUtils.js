/**
 * Reseta o banco de dados. CUIDADO: Isso descartará todas as tabelas e dados.
 *
 * @param {Sequelize} sequelize - Uma instância do Sequelize.
 * @return {Promise<void>}
 */
async function resetDatabase(sequelize) {
  try {
    await sequelize.sync({force: true});
    console.log('O banco de dados foi resetado com sucesso.');
  } catch (error) {
    console.error('Houve um erro ao resetar o banco de dados:', error);
  }
}

module.exports = resetDatabase;
