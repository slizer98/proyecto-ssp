import {DataTypes} from 'sequelize';
import db from '../config/db.js';

// Miembros: Datos personales, sede, fecha de nacimiento, correo, ID, participaciones, conocimientos, proyectos
// La sede es un modelo aparte
const Miembros = db.define('miembros', {
    AIMID: DataTypes.STRING,
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaNacimiento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    participaciones: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    conocimientos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    proyectos: {
        type: DataTypes.STRING,
        allowNull: false,
    }

});

export default Miembros;