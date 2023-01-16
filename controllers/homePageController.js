import { check, validationResult } from 'express-validator';
import { Usuario, Mensaje } from '../models/index.js';

const paginaPrincipal = (req, res) => {
    res.json({
        ok: true,
        msg: 'Pagina principal'
    });
}

const enviarMensaje = async (req, res) => {
    const { email, mensaje } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    await check('email', 'El email es obligatorio').not().isEmpty().isEmail().run(req);
    await check('mensaje', 'El mensaje debe tener al menes 10 caracteres').not().isEmpty().isLength({ min: 10 }).run(req);
    
    const errores = validationResult(req);

    // identificar usuario que enviara el mensaje
    const usuarioEnvia = await Usuario.findOne({ where: { id: req.params.id } });

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.array()
        });
    }

    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe'
        });
    }
    // crear el mensaje
    const mensajeDb = await Mensaje.create({
        usuarioEnvia: usuarioEnvia.email,
        mensaje,
        usuarioId: usuario.id
    });
    // guardar el mensaje
    await mensajeDb.save();
    res.status(200).json({
        ok: true,
        msg: 'Mensaje enviado correctamente'
    });
}

const verMensaje = async(req, res) => {
    // obtener los mensajes de un usuario por medio del id del usuario
    const mensajesUsuario = await Mensaje.findAll({
        where: {
            usuarioId: req.params.id
        },
    });
    res.status(200).json({ ok: true, mensajesUsuario});
}

export { paginaPrincipal, enviarMensaje, verMensaje }