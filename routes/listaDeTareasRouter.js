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
router.get('/obtener-tarea/:idTarea', auth, obtenerTarea)
router.post('/:id', auth, agregarTarea);
router.put('/:id', auth, modificarTarea);
router.put('/completar/:id', auth, completarTarea);
router.delete('/:id', auth, eliminarTarea);

export default router;