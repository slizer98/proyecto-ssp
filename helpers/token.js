import jwt from 'jsonwebtoken';
const generarJWT = datos => jwt.sign({id: datos.id, AIMID: datos.AIMID, nombre: datos.nombre, rol: datos.rol },process.env.JWT_SECRET, {expiresIn: '1d'}) 
export { generarJWT }