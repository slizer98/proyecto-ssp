import express from 'express';
import { 
    confirmarCuenta, 
    formularioLogin, 
    formularioRegistro, 
    olvidePassword, 
    recuperarPassword,
    obtenerUsuario,
    editarUsuario
} from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/login', formularioLogin);
router.post('/registro', formularioRegistro);
router.get('/confirmar/:token', confirmarCuenta)
router.post('/olvide-password', olvidePassword);
router.get('/recuperar-password/:token', recuperarPassword);
router.get('/obtener-usuario/:id', obtenerUsuario);
router.put('/actualizar-usuario/:id', editarUsuario);

export default router;