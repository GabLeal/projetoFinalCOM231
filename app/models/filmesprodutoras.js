'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FilmesProdutoras extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FilmesProdutoras.init({
    idfilme: DataTypes.INTEGER,
    idprodutora: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FilmesProdutoras',
    tableName: 'filmesprodutoras',
    timestamps:false
  });

  FilmesProdutoras.removeAttribute('id');
  return FilmesProdutoras;
};