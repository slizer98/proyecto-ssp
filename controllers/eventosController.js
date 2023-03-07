import { Evento } from '../models/index.js'

const obetenerEventos = async (req, res) => {
    try {
        const eventos = await Evento.findAll();
        if(eventos.length === 0) {
            return res.status(200).json({ok: false, msg: 'No hay eventos registrados'});
        }
        res.status(200).json({ok: true, eventos});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const crearEvento = async (req, res) => {
    try {
        const { nombre, fecha, hora, duracion, lugar, descripcion, responsable } = req.body;
        const evento = await Evento.create({ nombre, fecha, hora, duracion, lugar, descripcion, responsable });
        res.status(200).json({ok: true, msg: 'Evento creado correctamente'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export { 
    obetenerEventos,
    crearEvento

 }