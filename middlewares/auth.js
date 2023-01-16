import jwt from 'jsonwebtoken';

// autorizacion por header
const auth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }
    // obtener el token y verificarlo
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    // Si es un token valido, pero hubo un error
    if (!revisarToken) {
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }
    next();

}

export { auth };