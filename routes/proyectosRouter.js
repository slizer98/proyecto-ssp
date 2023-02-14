import express from 'express';
import { obtenerProyectos } from '../controllers/proyectosController.js';
const router = express.Router();

router.get('/', obtenerProyectos);

export default router;