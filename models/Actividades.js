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
    },
    sede: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

export default Actividades;