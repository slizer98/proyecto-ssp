import {DataTypes} from 'sequelize';
import db from '../config/db.js';

// Capitulos: nombre, sedes
// Las sedes son modelos aparte
const Capitulos = db.define('capitulos', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Capitulos;