'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Generos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Generos.belongsToMany(models.Filmes,{
        through: 'filmesgeneros',
        foreignKey: 'idgenero',
      })
    }
  };
  Generos.init({
    idgenero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Generos',
    tableName: 'generos',
    timestamps: false
  });
  return Generos;
};