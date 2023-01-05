import { check, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';

const formularioLogin = async(req, res) => {
    // buscar usuario por ID
    const usuario = await Usuario.findOne({where: {AIMID: req.body.AIMID}});
    // si no existe el usuario
    if(!usuario){
        return res.json({msg: 'Usuario no existe'});
    }
    // si el password es incorrecto
    if(usuario.password !== req.body.password){
        return res.json({msg: 'Password incorrecto'});
    }
    // si el password  e ID es correcto
    res.json({msg: 'Login correcto'});

}

const formularioRegistro = async(req, res) => {
    // validacion de campos
    await check('nombre', 'El nombre es obligatorio').notEmpty().run(req);
    await check('email', 'El email no es valildo').isEmail().run(req);
    await check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6}).run(req);
    await check('repetir_password', 'Los passwods no coinciden').equals(req.body.password).run(req);
    await check('ciudad', 'La ciudad es obligatoria').notEmpty().run(req);
    await check('fechaNacimiento', 'La fecha de nacimiento es obligatoria').notEmpty().run(req);
    await check('gradoEstudios', 'El grado de estudios es obligatorio').notEmpty().run(req);
    await check('suscripcion', 'La suscripcion es obligatoria').notEmpty().run(req);
    await check('conocimientos', 'Los conocimientos son obligatorios').notEmpty().run(req);
    await check('intereses', 'Los intereses son obligatorios').notEmpty().run(req);
    let resultado = validationResult(req);
    // imprimir errores 
    if(!resultado.isEmpty()){ 
        return res.json(resultado.errors); 
    }

    // comprobar si el usuario ya existe
    const usuarioExiste = await Usuario.findOne({where: {email: req.body.email}});
    if(usuarioExiste){
        return res.json({msg: 'El email ya esta registrado'});r
    }
    const usuario = await Usuario.create(req.body);
    res.json(usuario);
}

export {
    formularioLogin,
    formularioRegistro
}