import express from 'express';
import { obtenerProyectos, 
    obtenerProyectosUsuario,    
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto, 
    obtenerProyectosRecientes} from '../controllers/proyectosController.js';
const router = express.Router();

router.get('/', obtenerProyectos);
router.get('/recientes', obtenerProyectosRecientes);
router.get('/:id', obtenerProyectosUsuario);

router.post('/:id', crearProyecto);
router.put('/:id', actualizarProyecto);
router.delete('/:id', eliminarProyecto);

export default router;