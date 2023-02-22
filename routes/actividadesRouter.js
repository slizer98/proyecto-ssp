import express from 'express';
import { obtenerActividades, obtenerActividad, crearActividad, completarActividad } from '../controllers/actividadesController.js';

const router = express.Router();

router.get('/:id', obtenerActividades);
router.get('/obtener-actividad/:id', obtenerActividad);
router.post('/:id', crearActividad);
router.put('/:id', completarActividad);


export default router;