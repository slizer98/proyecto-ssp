import { Usuario, Asistencia } from '../models/index.js'

const agregarAsistencia = async (req, res) => {
    const eventoId = req.params.id;
    const {AIMID} = req.body;
    // buscar id del usuario con el AIMID
    const usuario = await Usuario.scope('eliminarPassword').findOne({
        where: {
            AIMID
        }
    });
    // console.log(usuario);
    if (!usuario) {
        return res.status(200).json({
            ok: false,
            msg: 'No existe un usuario con ese AIMID'
        })
    }
    const fecha = new Date();

    
    await Asistencia.create({
        fecha,
        usuarioId: usuario.id,
        eventoId
    });
    res.json({ ok: true, msg: 'Asistencia registrada'});
    
}

export {
    agregarAsistencia
}