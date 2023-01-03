import {DataTypes} from 'sequelize';
import db from '../config/db.js';

// Actividades: fecha, sede, nombre de miembro
// La sede es un modelo aparte
const Actividades = db.define('actividades', {
    fecha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombreMiembro: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Actividades;