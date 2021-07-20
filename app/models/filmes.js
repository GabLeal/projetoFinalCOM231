'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filmes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Filmes.belongsToMany(models.Generos,{
        through: 'filmesgeneros',
        foreignKey: 'idfilme'
      })

      Filmes.belongsToMany(models.Produtoras,{
        through: 'filmesprodutoras',
        foreignKey: 'idfilme'
      })

      Filmes.belongsToMany(models.Atores,{
        through: 'atuacoes',
        foreignKey: 'idfilme'
      })
      // define association here
    }
  };
  Filmes.init({
    idfilme: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    datalancamento: DataTypes.DATE,
    duracao: DataTypes.INTEGER,
    linguagemoriginal: DataTypes.STRING,
    orcamento: DataTypes.DOUBLE,
    nota: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Filmes',
    tableName: 'filmes',
    timestamps: false,
  });
  return Filmes;
};