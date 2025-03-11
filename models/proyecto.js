"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Proyecto extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Proyecto.belongsToMany(models.Usuario, {
                through: "UsuarioProyectos",
                foreignKey: "proyectoId",
            });
            Proyecto.hasMany(models.Tarea, {
                foreignKey: "proyectoId",
                as: "tareas",
            });
        }
    }
    Proyecto.init(
        {
            nombre: DataTypes.STRING,
            descripcion: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Proyecto",
        }
    );
    return Proyecto;
};
