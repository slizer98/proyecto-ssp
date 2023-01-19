// controlador para tareas
import ListaTarea from '../models/ListaTarea.js';
import {check, validationResult } from 'express-validator';

// obtener todas las tareas
const obtenerTareas = async (req, res) => {
    try {
        let tareas = [] 
        tareas = await ListaTarea.findAll();
        if(tareas.length === 0) {
            return res.status(404).json({ok: false, msg: 'No hay tareas' });
        } 
        res.status(200).json({ok: true, tareas });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al obtener las tareas', error });
    }
}

// agregar una tarea
const agregarTarea = async (req, res) => {
    try {
        // Validaciones
        await check('nombre', 'El nombre debe tener al menos 10 caracteres').isLength({ min: 10 }).run(req);
        await check('hora', 'La hora no puede estar vacia').notEmpty().run(req);
        await check('fecha', 'La fecha no puede estar vacia').notEmpty().run(req);
        const errores = validationResult(req);
        if(!errores.isEmpty()) {
            return res.status(400).json({ok: 'errores', errors: errores.array() });
        }
        const nuevaTarea = await ListaTarea.create(req.body);
        res.status(200).json({ok: 'ok', nuevaTarea});
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al agregar la tarea' });
    }
}

// modificar una tarea
const modificarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        // validaciones
        const tarea = await ListaTarea.findOne({ where: { id } });
        if(!tarea) {
            return res.status(404).json({ msg: 'La tarea no existe' });
        }
        await check('nombre', 'El nombre debe tener al menos 10 caracteres').isLength({ min: 10 }).run(req);
        await check('fecha', 'La fecha no puede estar vacia').notEmpty().run(req);
        const errores = validationResult(req);
        if(!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }
        await ListaTarea.update(req.body, { where: { id } });
        res.status(200).json({ msg: 'Tarea modificada correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al modificar la tarea' });
    }
}

// completar o descompletar una tarea
const completarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        // validaciones
        const tarea = await ListaTarea.findOne({ where: { id } });
        if(!tarea) {
            return res.status(404).json({ msg: 'La tarea no existe' });
        }
        await ListaTarea.update({ estado: !tarea.estado }, { where: { id } });
        res.status(200).json({ok: true, msg: 'Tarea modificada correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al modificar la tarea' });
    }
}

// actualizar el estado de una tarea
const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;
        // validaciones
        const tarea = await ListaTarea.findOne({ where: { id } });
        if(!tarea) {
            return res.status(404).json({ msg: 'La tarea no existe' });
        }
        await ListaTarea.destroy({ where: { id } });
        res.status(200).json({ msg: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ msg: 'Error al eliminar la tarea' });
    }
}

export { 
    obtenerTareas, 
    agregarTarea, 
    completarTarea,
    modificarTarea, 
    eliminarTarea 
};