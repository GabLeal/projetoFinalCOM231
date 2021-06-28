'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produtoras extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Produtoras.belongsToMany(models.Filmes,{
        through: 'filmesprodutoras',
        foreignKey: 'idprodutora'
      })
      // define association here
    }
  };
  Produtoras.init({
    idprodutora: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    localizacao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produtoras',
    tableName: 'produtoras',
    timestamps: false
  });
  return Produtoras;
};