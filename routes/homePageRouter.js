// rutas para la home page
import { Router } from 'express';
import {paginaPrincipal, enviarMensaje, verMensaje } from '../controllers/homePageController.js';
import { auth } from '../middlewares/auth.js';
const router = Router();

router.get('/', auth ,paginaPrincipal);

// ruta para enviar un mensaje
router.post('/enviar-mensaje/:id', enviarMensaje);
// ver mensajes
router.get('/ver-mensajes/:id', verMensaje);

export default router;