"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Tarea extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Tarea.belongsTo(models.Proyecto, {
                foreignKey: "proyectoId",
                as: "proyecto",
            });
            Tarea.belongsToMany(models.Usuario, {
                through: "UsuarioTareas",
                foreignKey: "tareaId",
            });
        }
    }
    Tarea.init(
        {
            titulo: DataTypes.STRING,
            descripcion: DataTypes.TEXT,
            prioridad: DataTypes.STRING,
            estado: DataTypes.STRING,
            fecha_limite: DataTypes.DATE,
            proyectoId: DataTypes.INTEGER,
            usuarioId: DataTypes.STRING, //cambiar a STRING en la migration
        },
        {
            sequelize,
            modelName: "Tarea",
        }
    );
    return Tarea;
};
