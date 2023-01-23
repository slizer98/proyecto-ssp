import { check, validationResult } from 'express-validator';
import { Usuario, Mensaje } from '../models/index.js';

const paginaPrincipal = (req, res) => {
    res.json({
        ok: true,
        msg: 'Pagina principal'
    });
}

const enviarMensaje = async (req, res) => {
    await check('email', 'Email no valido').isEmail().run(req);
    await check('mensaje', 'El mensaje debe tener al menes 10 caracteres').isLength({ min: 10 }).run(req);
    
    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: "errores",
            errores: errores.array()
        });
    }
    const { email, asunto, mensaje } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    // identificar usuario que enviara el mensaje
    const usuarioEnvia = await Usuario.findOne({ where: { id: req.params.id } });


    if (!usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no esta registrado en la plataforma'
        });
    }
    // crear el mensaje
    const mensajeDb = await Mensaje.create({
        usuarioEnvia: usuarioEnvia.email,
        asunto,
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
    if(mensajesUsuario.length === 0){
        return res.status(200).json({
            ok: false,
            msg: 'No hay mensajes para este usuario',
            mensajesUsuario: []
        });
    }
    res.status(200).json({ ok: true, mensajesUsuario});
}

export { paginaPrincipal, enviarMensaje, verMensaje }