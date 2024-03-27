'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Despesa extends Model {
    static associate(models) {
      // define association here
    }
  }
  Despesa.init({
    descricao: DataTypes.STRING,
    valor: DataTypes.STRING,
    data: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Despesa',
    tableName: 'despesas',
  });
  return Despesa;
};
