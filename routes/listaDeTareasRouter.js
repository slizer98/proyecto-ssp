// Rutas para lista de tareas

import express from 'express';
import { 
    obtenerTareas, 
    agregarTarea, 
    modificarTarea, 
    completarTarea,
    eliminarTarea,
    obtenerTarea
    } from '../controllers/listaDeTareasController.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();

router.get('/:id', auth, obtenerTareas);
router.get('/obtener-tarea/:idTarea', obtenerTarea)
router.post('/:id', agregarTarea);
router.put('/:id', modificarTarea);
router.put('/completar/:id', completarTarea);
router.delete('/:id', eliminarTarea);

export default router;