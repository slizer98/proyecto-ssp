import express from 'express';
import { 
    obetenerEventos, 
    crearEvento, 
    actualizarEvento, 
    eliminarEvento 
    } from '../controllers/eventosController.js';

const router = express.Router();

router.get('/', obetenerEventos);
router.post('/', crearEvento)
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);


export default router;