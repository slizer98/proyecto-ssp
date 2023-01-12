// rutas para la home page
import { Router } from 'express';
import { enviarMensaje, verMensaje } from '../controllers/homePageController.js';
const router = Router();


// ruta para enviar un mensaje
router.post('/enviar-mensaje/:id', enviarMensaje);
// ver mensajes
router.get('/ver-mensajes/:id', verMensaje);

export default router;