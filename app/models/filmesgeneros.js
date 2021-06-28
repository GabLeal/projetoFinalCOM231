'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FilmesGeneros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FilmesGeneros.init({
    idfilme: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
    idgenero: {
      type:DataTypes.INTEGER,
      primaryKey: true
    },
  }, {
    sequelize,
    modelName: 'FilmesGeneros',
    tableName: 'filmesgeneros',
    timestamps: false,
    
  });
  return FilmesGeneros;
};