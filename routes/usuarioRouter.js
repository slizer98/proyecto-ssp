import express from 'express';
import { confirmarCuenta, formularioLogin, formularioRegistro } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/login', formularioLogin);
router.post('/registro', formularioRegistro);
router.get('/confirmar/:token', confirmarCuenta)

export default router;