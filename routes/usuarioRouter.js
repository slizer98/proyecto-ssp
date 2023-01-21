import express from 'express';
import { confirmarCuenta, formularioLogin, formularioRegistro, olvidePassword, recuperarPassword } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/login', formularioLogin);
router.post('/registro', formularioRegistro);
router.get('/confirmar/:token', confirmarCuenta)
router.post('/olvide-password', olvidePassword);
router.get('/recuperar-password/:token', recuperarPassword);

export default router;