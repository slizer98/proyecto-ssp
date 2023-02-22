import Actividades from '../models/Actividades.js';
import { check, validationResult } from 'express-validator';

const obtenerActividades = async (req, res) => {
    try {
        const { id } = req.params;
        const actividades = await Actividades.findAll({ where: { proyectoId: id } });
        if(actividades.length === 0) {
            return res.status(200).json({ok: false, msg: 'No hay actividades' });
        }
        const actividadesTotales = actividades.length;
        const actividadesCompletadas = actividades.filter(actividad => actividad.estado === true).length;
        const porcentaje = Math.round((actividadesCompletadas / actividadesTotales) * 100);
        res.status(200).json({ok: true, actividades, porcentaje });
    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: 'Error inesperado al obtener actividades'});
    }
}

const obtenerActividad = async (req, res) => {
    try {
        const { id } = req.params;
        const actividad = await Actividades.findOne({where: {id}});
        if(!actividad) {
            return res.status(404).json({ok: false, msg: 'Actividad no encontrada'});
        }
        res.status(200).json({ok: true, actividad});
    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: 'Error inesperado al obtener actividad'});
    }
}

const crearActividad = async (req, res) => {
    try {
        const { id } = req.params;
        await check('nombre', 'El nombre debe tener al menos 10 caracteres').isLength({ min: 10 }).run(req);
        await check('descripcion', 'La descripcion debe tener al menos 20 caracteres').isLength({ min: 10 }).run(req);
        await check('fecha', 'La fecha no puede estar vacia').notEmpty().run(req);
        await check('sede', 'La sede no puede estar vacia').notEmpty().run(req);
        await check('nombreMiembro', 'El nombre del miembro no puede estar vacio').notEmpty().run(req);
        const errores = validationResult(req);
        if(!errores.isEmpty()) {
            return res.status(400).json({ok: 'errores', errors: errores.array() });
        }
        const nuevaActividad = await Actividades.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            fecha: req.body.fecha,
            sede: req.body.sede,
            nombreMiembro: req.body.nombreMiembro,
            proyectoId: id
        })  
        res.status(200).json({ok: true, nuevaActividad });
    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: 'Error inesperado al crear actividad'});
    }
}

const completarActividad = async (req, res) => {
    const {id} = req.params;
    try {
        const actividad = await Actividades.findOne({where: {id}});
        if(!actividad) {
            return res.status(404).json({ok: false, msg: 'Actividad no encontrada'});
        }
        actividad.completado = true;
        await actividad.save();
        res.json({ok: true, actividad});
    } catch (error) {
        console.log(error);
        res.status(500).json({ok: false, msg: 'Error inesperado al completar actividad'});
    }
}


export {
    obtenerActividades,
    obtenerActividad,
    crearActividad,
    completarActividad
}