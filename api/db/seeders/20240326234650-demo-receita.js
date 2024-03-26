const uuid = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('receitas', [{
      id: uuid.v4(),
      descricao: 'Salario',
      valor: 'R$ 200,00',
      data: '2023-01-01',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      id: uuid.v4(),
      descricao: 'Mesada',
      valor: 'R$ 150,00',
      data: '2023-01-07',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('receitas', null, {});
  },
};
