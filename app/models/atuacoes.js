'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Atuacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here
      Atuacoes.belongsTo(models.Filmes,{
        through: 'atuacoes',
        foreignKey: 'idfilme'
      })
      Atuacoes.belongsTo(models.Atores,{
        through: 'atuacoes',
        foreignKey: 'idator'
      })
    }
  };
  Atuacoes.init({
    idfilme: DataTypes.INTEGER,
    idator: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Atuacoes',
    tableName: 'atuacoes',
    timestamps:false
  });

  Atuacoes.removeAttribute('id');
  return Atuacoes;
};