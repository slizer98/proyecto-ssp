import {DataTypes} from 'sequelize';
import bcrypt from 'bcrypt';
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
    rol: {
        type: DataTypes.STRING,
        defaultValue: 'usuario'
    }
    
},{
    hooks: {
        beforeCreate: async function(usuario){
            const AIMID = Date.now();
            usuario.AIMID = AIMID;
            
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, salt);
        },
    },
    scopes: {
        eliminarPassword: {
            attributes: {
                exclude: ['password', 'token', 'confirmado', 'createdAt', 'updatedAt']
            }
        },
    },
});

// Metodos personalizados
Usuario.prototype.verificarPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

export default Usuario;