import express from 'express';
import { obtenerActividades, obtenerCapitulos, obtenerMiembros, obtenerSedes } from '../controllers/capitulosController.js';

const router = express.Router();

router.get('/', obtenerCapitulos);
router.get('/sedes:id',obtenerSedes );
router.get('/miembros:id', obtenerMiembros);
router.get('/actividades:id', obtenerActividades);

export default router;