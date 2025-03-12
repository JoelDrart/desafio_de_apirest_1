'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comentario.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario'
      });
      Comentario.belongsTo(models.Tarea, {
        foreignKey: 'tareaId',
        as: 'tarea'
      });
      
    }
  }
  Comentario.init({
    contenido: DataTypes.TEXT,
    usuarioId: DataTypes.STRING, //cambiar a STRING en la migration
    tareaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comentario',
  });
  return Comentario;
};