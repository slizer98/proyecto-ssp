import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';

const formularioLogin = (req, res) => {
    res.send('LOGIN');
}

const formularioRegistro = async(req, res) => {
    // validacion de campos
    await check('nombre', 'El nombre es obligatorio').notEmpty().run(req);
    await check('email', 'El email no es valildo').isEmail().run(req);
    await check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6}).run(req);
    let resultado = validationResult(req);
    // imprimir errores
    res.json(resultado.errors);

   const usuario = await Usuario.create(req.body);
   res.json(usuario);
}

export {
    formularioLogin,
    formularioRegistro
}