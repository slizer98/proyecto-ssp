import express from 'express';
import { 
    obetenerEventos, 
    obetenerEvento,
    crearEvento, 
    actualizarEvento, 
    eliminarEvento 
    } from '../controllers/eventosController.js';

const router = express.Router();

router.get('/', obetenerEventos);
router.get('/:id', obetenerEvento);
router.post('/:id', crearEvento)
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);


export default router;