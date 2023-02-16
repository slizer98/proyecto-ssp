import {DataTypes} from 'sequelize';
import db from '../config/db.js';

// Proyecto: nombre, ID de proyectista, personal del proyecto, actividades de la lista de tareas y responsable

const Proyectos = db.define('proyectos', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    IDproyectista: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    personal: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    actividades: {
        type: DataTypes.STRING,
    },
    responsable: {  
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export default Proyectos;