import {DataTypes} from 'sequelize';
import db from '../config/db.js';

// ListaTarea: nombre, fecha
const ListaTarea = db.define('listaTarea', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hora: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

export default ListaTarea;
