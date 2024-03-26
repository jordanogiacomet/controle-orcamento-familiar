'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Despesa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
