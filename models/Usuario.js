import {DataTypes} from 'sequelize';
import db from '../config/db.js';

const Usuario = db.define('usuarios', {
    AIMID: DataTypes.STRING,
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaNacimiento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gradoEstudios: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    suscripcion: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    conocimientos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    intereses: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: DataTypes.STRING, 
    confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    estado: DataTypes.STRING,
    
},{
    hooks: {
        beforeCreate: async function(usuario){
            const AIMID = Date.now();
            usuario.AIMID = AIMID;


        }
    },
    scopes: {
        eliminarPassword: {
            attributes: {
                exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
            }
        },
    },
});


export default Usuario;