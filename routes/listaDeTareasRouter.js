// Rutas para lista de tareas

import express from 'express';
import { 
    obtenerTareas, 
    agregarTarea, 
    modificarTarea, 
    eliminarTarea 
    } from '../controllers/listaDeTareasController.js';
const router = express.Router();

router.get('/', obtenerTareas);
router.post('/', agregarTarea);
router.put('/:id', modificarTarea);
router.delete('/:id', eliminarTarea);

export default router;