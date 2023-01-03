import {DataTypes} from 'sequelize';
import db from '../config/db.js';

// ListaTarea: nombre, fecha
const ListaTarea = db.define('listaTarea', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default ListaTarea;
