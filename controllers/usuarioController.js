import { check, validationResult } from 'express-validator';
import { generarJWT } from '../helpers/token.js';
import { emailRegistro, emailOlvidePassword } from '../helpers/emails.js';
import Usuario from '../models/Usuario.js';

const formularioLogin = async(req, res) => {
    // validacion de campos
    await check('AIMID', 'El AIMID es obligatorio').notEmpty().run(req);
    await check('password', 'El password es obligatorio').notEmpty().run(req);
    let resultado = validationResult(req);
    // imprimir errores
    if(!resultado.isEmpty()){
        return res.status(400).json({ok: 'errores', errors: resultado.array()});
    }
    // buscar usuario por ID
    const usuario = await Usuario.findOne({where: {AIMID: req.body.AIMID}});
    // si no existe el usuario
    if(!usuario){
        return res.status(400).json({ok: false, msg: 'El usuario no existe'});
    }
    // si el password es incorrecto
    if(!usuario.verificarPassword(req.body.password)){
        return res.status(400).json({ok: false, msg: 'El password es incorrecto'});
    }
    if(!usuario.confirmado){
        return res.status(400).json({ok: false, msg: 'El usuario no ha confirmado su cuenta'});
    }
    // auntenticar usuario
    const token = await generarJWT({AIMID: usuario.AIMID, nombre: usuario.nombre, id: usuario.id});
    res.json({ok: true, token});

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
        return res.json({ok: 'errores', errors: resultado.array()}); 
    }

    // comprobar si el usuario ya existe
    const usuarioExiste = await Usuario.findOne({where: {email: req.body.email}});
    if(usuarioExiste){
        return res.json({msg: 'El email ya esta registrado'});r
    }
    // enviar email de confirmacion
    const token = await generarJWT({AIMID: req.body.AIMID, nombre: req.body.nombre, id: req.body.id, rol: 'externo'});
    
    const usuario = await Usuario.create({
        AIMID: req.body.AIMID,
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        ciudad: req.body.ciudad,
        fechaNacimiento: req.body.fechaNacimiento,
        gradoEstudios: req.body.gradoEstudios,
        suscripcion: req.body.suscripcion,
        conocimientos: req.body.conocimientos,
        intereses: req.body.intereses,
        token,
        rol: 'externo'
    });

    emailRegistro({
        AIMID: usuario.AIMID,
        nombre: usuario.nombre,
        email: usuario.email,
        token
    });
    res.json({ok: true, token});
}

const confirmarCuenta = async(req, res) => {
    // buscar usuario por token
    const usuario = await Usuario.findOne({where: {token: req.params.token}});
    // si no existe el usuario
    if(!usuario){
        return res.status(400).json({ok: false, msg: 'El usuario no existe'});
    }
    // confirmar usuario
    usuario.confirmado = true;
    usuario.token = null;
    await usuario.save();
    // enviar a la pantalla de usuario confirmado
    res.redirect('http://127.0.0.1:5500/HTML/cuentaConfirmada.html');
}

const olvidePassword = async(req, res) => {
    // validacion de campos
    await check('enviar-olvide', 'El email no es valildo').isEmail().run(req);
    // buscar usuario por email
    const usuario = await Usuario.findOne({where: {email: req.body.email}});
    // si no existe el usuario
    if(!usuario){
        return res.status(400).json({ok: false, msg: 'El usuario no existe'});
    }

    // generar token
    const token = await generarJWT({AIMID: usuario.AIMID, nombre: usuario.nombre, id: usuario.id});
    // enviar email
    // guardar token en la base de datos
    usuario.token = token;
    await usuario.save();
    emailOlvidePassword({
        nombre: usuario.nombre,
        email: usuario.email,
        token
    });
    res.json({ok: true, token});
}

const recuperarPassword = async(req, res) => {
    // buscar usuario por token
    const usuario = await Usuario.findOne({where: {token: req.params.token}});

    if(!usuario){
        return res.status(400).redirect('http://127.0.0.1:5500/HTML/logginProyectista.html');
    }
    // enviar a la pantalla de recuperar password
    usuario.token = null;
    await usuario.save();
    res.redirect('http://127.0.0.1:5500/HTML/NewPassword.html');
}

const obtenerUsuario = async(req, res) => {
// buscar el usuario por el id del token y agregar el scope para eliminar el password
    const usuario = await Usuario.scope('eliminarPassword').findOne({where: {id: req.params.id}})   
    res.json({ok: true, usuario});
}

const editarUsuario = async(req, res) => {
    // validacion de campos
    await check('nombre', 'El nombre es obligatorio').notEmpty().run(req);
    await check('email', 'El email no es valildo').isEmail().run(req);
    await check('ciudad', 'La ciudad es obligatoria').notEmpty().run(req);
    await check('fechaNacimiento', 'La fecha de nacimiento es obligatoria').notEmpty().run(req);
    await check('gradoEstudios', 'El grado de estudios es obligatorio').notEmpty().run(req);
    await check('suscripcion', 'La suscripcion es obligatoria').notEmpty().run(req);
    await check('conocimientos', 'Los conocimientos son obligatorios').notEmpty().run(req);
    await check('intereses', 'Los intereses son obligatorios').notEmpty().run(req);
    let resultado = validationResult(req);
    // imprimir errores 
    if(!resultado.isEmpty()){ 
        return res.json({ok: 'errores', errors: resultado.array()}); 
    }
    // buscar usuario por id
    const usuario = await Usuario.findOne({where: {id: req.params.id}});
    // si no existe el usuario
    if(!usuario){
        return res.status(400).json({ok: false, msg: 'El usuario no existe'});
    }
    // actualizar usuario
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.ciudad = req.body.ciudad;
    usuario.fechaNacimiento = req.body.fechaNacimiento;
    usuario.gradoEstudios = req.body.gradoEstudios;
    usuario.suscripcion = req.body.suscripcion;
    usuario.conocimientos = req.body.conocimientos;
    usuario.intereses = req.body.intereses;
    await usuario.save();
    // enviar a la pantalla de usuario confirmado
    res.json({ok: true, usuario});
}

export {
    formularioLogin,
    formularioRegistro,
    confirmarCuenta,
    olvidePassword,
    recuperarPassword,
    obtenerUsuario,
    editarUsuario
}