// Rutas para lista de tareas

import express from 'express';
import { 
    obtenerTareas, 
    agregarTarea, 
    modificarTarea, 
    completarTarea,
    eliminarTarea 
    } from '../controllers/listaDeTareasController.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();

router.get('/', obtenerTareas);
router.post('/', agregarTarea);
router.put('/:id', modificarTarea);
router.put('/completar/:id', completarTarea);
router.delete('/:id', eliminarTarea);

export default router;