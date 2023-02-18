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

// mostrar proyectos de un usuario
const obtenerProyectosUsuario = async (req, res) => {
    try {
        console.log(req.query);
        const todosProyectos = await Proyectos.findAll({
            where: {
                usuarioId: req.params.id
            }
        });

        if(todosProyectos.length === 0) {
            return res.status(200).json({ok:false, msg: 'No hay proyectos' });
        }
        if(req.query.validado == 'true') {
            // retornar solo los proyectos validados
            const proyectos = todosProyectos.filter(proyecto => proyecto.estado == 1);
            return res.json({ok: 'validado', proyectos});
        }
        if(req.query.validado == 'false') {
            // retornar solo los proyectos no validados
            const proyectos = todosProyectos.filter(proyecto => proyecto.estado == 0);
            return res.json({ok:'noValidado', proyectos});
        }
        const proyectos = todosProyectos;
        res.json({ok:true, proyectos});
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false, msg:'Hubo un error al obtener los proyectos'});
    }
}

const crearProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        await check('nombre', 'El nombre del proyecto es obligatorio').notEmpty().isLength(5).run(req);
        await check('descripcion', 'La descripcion debe tener al menos 15 caracteres').notEmpty().run(req);
        await check('personal', 'El personal del proyecto es obligatorio').notEmpty().run(req);
        await check('responsable', 'El responsable del proyecto es obligatorio').notEmpty().run(req);
        const errores = validationResult(req);
        if(!errores.isEmpty()) {
            return res.status(400).json({ok: "errores", errors: errores.array()});
        }
        const proyecto = await Proyectos.create({
            nombre: req.body.nombre,
            IDproyectista: req.body.IDproyectista,
            descripcion: req.body.descripcion,
            personal: req.body.personal,
            actividades: req.body.actividades,
            responsable: req.body.responsable,
            usuarioId: id
        });
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
    obtenerProyectosUsuario,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto
};