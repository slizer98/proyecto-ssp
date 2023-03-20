import express from 'express';
import { agregarAsistencia } from '../controllers/asistenciasController.js';

const router = express.Router();

router.post('/:id', agregarAsistencia);


export default router;