import {Proyectos} from '../models/index.js';
import { check, validationResult } from 'express-validator';

const obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyectos.findAll();
        if(proyectos.length === 0) {
            return res.status(200).json({ msg: 'No hay proyectos' });
        }
        res.json(proyectos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false, msg:'Hubo un error al obtener los proyectos'});
    }
} 

const crearProyecto = async (req, res) => {
    try {
        // nombre, idProyectista, personal, actividades, responsable
        // idProyectista: ira por el id del usuario que este logueado
        // actividades: no es obligatorio, se podran agregar despues
        check('nombre', 'El nombre del proyecto es obligatorio').notEmpty().run(req);
        check('personal', 'El personal del proyecto es obligatorio').notEmpty().run(req);
        check('responsable', 'El responsable del proyecto es obligatorio').notEmpty().run(req);
        const errores = validationResult(req);
        if(!errores.isEmpty()) {
            return res.status(400).json({ok: false, errors: errores.array()});
        }
        const proyecto = await Proyectos.create(req.body);
        res.json({ok:true, proyecto});
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false, msg:'Hubo un error al crear el proyecto'});
    }
}

const actualizarProyecto = async (req, res) => {
    try {
        check('nombre', 'El nombre del proyecto es obligatorio').notEmpty().run(req);
        check('personal', 'El personal del proyecto es obligatorio').notEmpty().run(req);
        check('responsable', 'El responsable del proyecto es obligatorio').notEmpty().run(req);
        const errores = validationResult(req);
        if(!errores.isEmpty()) {
            return res.status(400).json({ok: false, errors: errores.array()});
        }
        const proyecto = await Proyectos.update({
            nombre: req.body.nombre,
            personal: req.body.personal,
            actividades: req.body.actividades,
            responsable: req.body.responsable  
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({ok:true, msg:'Proyecto actualizado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false, msg:'Hubo un error al crear el proyecto'});
    }
}

const eliminarProyecto = async (req, res) => {
    try {
        await Proyectos.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({ok:true, msg:'Proyecto eliminado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false, msg:'Hubo un error al crear el proyecto'});
    }
}


export { 
    obtenerProyectos,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto
};