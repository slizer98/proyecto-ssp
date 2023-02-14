import { Capitulos, Sedes, Miembros, Actividades } from '../models/index.js'

// Obtener todos los capitulos
const obtenerCapitulos = async (req, res) => {
    try {
        const capitulos = await Capitulos.findAll();
        if(capitulos.length === 0) {
            return res.status(404).json({ok: false, message: 'No hay capitulos' });
        }
        res.status(200).json({ok: true, capitulos});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener los capitulos' });
    }
}

// Obtener todas las sedes dependiendo del capitulo
const obtenerSedes = async (req, res) => {
    try {
        const { id } = req.params;
        const sedes = await Sedes.findAll({
            where: {
                CapituloId: id
            }
        });
        if(sedes.length === 0) {
            return res.status(404).json({ok: false, message: 'No hay sedes' });
        }
        res.status(200).json({ok: true, sedes});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener las sedes' });
    }
}

// Obtener todos los miembros dependiendo de la sede
const obtenerMiembros = async (req, res) => {
    try {
        const { id } = req.params;
        const miembros = await Miembros.findAll({
            where: {
                SedeId: id
            }
        });
        if(miembros.length === 0) {
            return res.status(404).json({ok: false, message: 'No hay miembros' });
        }
        res.status(200).json({ok: true, miembros});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener los miembros' });
    }
}

// Obtener todas las actividades dependiendo del miembro
const obtenerActividades = async (req, res) => {
    try {
        const { id } = req.params;
        const actividades = await Actividades.findAll({
            where: {
                MiembroId: id
            }
        });
        if(actividades.length === 0) {
            return res.status(404).json({ok: false, message: 'No hay actividades' });
        }
        res.status(200).json({ok: true, actividades});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener las actividades' });
    }
}



export {
    obtenerCapitulos,
    obtenerSedes,
    obtenerMiembros,
    obtenerActividades
}