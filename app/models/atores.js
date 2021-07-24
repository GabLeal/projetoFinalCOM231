'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Atores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Atores.belongsToMany(models.Filmes,{
        through: 'atuacoes',
        foreignKey: 'idator'
      })
      // define association here
    }
  };
  Atores.init({
    idator: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    aniversario: DataTypes.DATE,
    area: DataTypes.STRING,
    popularidade: DataTypes.DOUBLE,
    bibliografia: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Atores',
    tableName: 'atores',
    timestamps: false
  });
  return Atores;
};