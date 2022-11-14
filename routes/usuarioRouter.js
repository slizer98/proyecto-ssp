import express from 'express';
import { formularioLogin, formularioRegistro } from '../controller/usuarioController.js';

const router = express.Router();

router.get('/login', formularioLogin);
router.post('/registro', formularioRegistro);

export default router;