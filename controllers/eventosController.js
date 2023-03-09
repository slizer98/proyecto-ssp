import { Evento } from '../models/index.js'

const obetenerEventos = async (req, res) => {
    try {
        const eventos = await Evento.findAll();
        if(eventos.length === 0) {
            return res.status(200).json({ok: false, eventos});
        }
        res.status(200).json({ok: true, eventos});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const crearEvento = async (req, res) => {
    try {
        const { nombre, fecha, hora, duracion, lugar, descripcion, responsable, background } = req.body;
        const evento = await Evento.create({ nombre, fecha, hora, duracion, lugar, descripcion, responsable, background });
        res.status(200).json({ok: true, msg: 'Evento creado correctamente'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const actualizarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, fecha, hora, duracion, lugar, descripcion, responsable } = req.body;
        const evento = await Evento.update({ nombre, fecha, hora, duracion, lugar, descripcion, responsable }, { where: { id } });
        res.status(200).json({ok: true, msg: 'Evento actualizado correctamente'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const eliminarEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await Evento.destroy({ where: { id } });
        res.status(200).json({ok: true, msg: 'Evento eliminado correctamente'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export { 
    obetenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
 }