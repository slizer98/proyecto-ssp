
const formularioLogin = (req, res) => {
    res.send('LOGIN');
}

const formularioRegistro = (req, res) => {
    //establecer headers
    // campos del formulario
    const { nombres, apellidos, email, password, password2 } = req.body;
    // validaciones
    // 1. que los campos no esten vacios
    if (!nombres || !apellidos || !email || !password || !password2) {
        return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }
    // 2. que el password tenga al menos 6 caracteres
    if (password.length < 6) {
        return res.status(400).json({ msg: 'El password debe tener al menos 6 caracteres' });
    }
    // 3. que el password y el password2 sean iguales
    if (password !== password2) {
        return res.status(400).json({ msg: 'Los passwords no coinciden' });
    }
    // crear usuario
    const usuario = {
        nombres,
        apellidos,
        email,
        password
    }
    // mandar respuesta
    res.json({ msg: 'Usuario creado correctamente', usuario });
    
}

export {
    formularioLogin,
    formularioRegistro
}