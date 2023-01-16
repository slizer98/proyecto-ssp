// Rutas para lista de tareas

import express from 'express';
import { 
    obtenerTareas, 
    agregarTarea, 
    modificarTarea, 
    eliminarTarea 
    } from '../controllers/listaDeTareasController.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();

router.get('/', auth, obtenerTareas);
router.post('/', agregarTarea);
router.put('/:id', modificarTarea);
router.delete('/:id', eliminarTarea);

export default router;