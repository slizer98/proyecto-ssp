import express from 'express';
import { obetenerEventos, crearEvento } from '../controllers/eventosController.js';

const router = express.Router();

router.get('/', obetenerEventos);
router.post('/', crearEvento)


export default router;