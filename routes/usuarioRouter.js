import express from 'express';
import { confirmarCuenta, formularioLogin, formularioRegistro, olvidePassword } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/login', formularioLogin);
router.post('/registro', formularioRegistro);
router.get('/confirmar/:token', confirmarCuenta)
router.get('/olvide-password/:token', olvidePassword);

export default router;