"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Usuario.init(
        {
            usuarioId: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            nombre: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            rol: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Usuario",
        }
    );
    return Usuario;
};
