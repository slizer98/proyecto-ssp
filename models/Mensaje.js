import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Mensaje = db.define('mensajes', {
    usuarioEnvia: {
        type: DataTypes.STRING,
    },
    asunto: {
        type: DataTypes.STRING,
    },
    mensaje: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    }
});

export default Mensaje;