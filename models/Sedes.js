import {DataTypes} from 'sequelize';
import db from '../config/db.js';

// Sedes: nombre, miebros, actividades
// Los miembros y actividades son modelos aparte
const Sedes = db.define('sedes', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Sedes;
