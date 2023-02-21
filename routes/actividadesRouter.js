import express from 'express';
import { obtenerActividades, crearActividad, completarActividad } from '../controllers/actividadesController.js';

const router = express.Router();

router.get('/:id', obtenerActividades);
router.post('/:id', crearActividad);
router.put('/:id', completarActividad);


export default router;