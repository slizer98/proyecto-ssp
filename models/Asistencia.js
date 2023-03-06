import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Asitencia = db.define('asistencias', {
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

export default Asitencia;