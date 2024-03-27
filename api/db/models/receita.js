'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Receita extends Model {
    static associate(models) {
      // define association here
    }
  }
  Receita.init({
    descricao: DataTypes.STRING,
    valor: DataTypes.STRING,
    data: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Receita',
    tableName: 'receitas',
  });


  return Receita;
};

