import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    gradoEstudios: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    suscripcion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    conocimientos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    intereses: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN,

});

export default Usuario;