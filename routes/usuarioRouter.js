import express from 'express';
import { formularioLogin, formularioRegistro } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/login', formularioLogin);
router.post('/registro', formularioRegistro);

export default router;