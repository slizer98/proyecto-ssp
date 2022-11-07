import express from 'express';
import { formularioLogin } from '../controller/usuarioController.js';

const router = express.Router();

router.get('/login', formularioLogin);

export default router;