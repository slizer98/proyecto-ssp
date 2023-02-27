import express from 'express';
import { 
    confirmarCuenta, 
    formularioLogin, 
    formularioRegistro, 
    olvidePassword, 
    recuperarPassword,
    obtenerUsuario,
    editarUsuario
} from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/login', formularioLogin);
router.post('/registro', formularioRegistro);
router.get('/confirmar/:token', confirmarCuenta)
router.post('/olvide-password', olvidePassword);
router.get('/recuperar-password/:token', recuperarPassword);
router.get('/obtener-usuario/:id', obtenerUsuario);
router.put('/editar-perfil/:id', editarUsuario);
// documentacion
// login
/**
 * @swagger
 * /auth/login:
  *   post:
 *     summary: Autenticación de usuario
 *     description: Autenticación de usuario utilizando ID y contraseña.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AIMID:
 *                 type: string
 *                 example: "1676918003022"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *             required:
 *               - AIMID
 *               - password
 *     responses:
 *       '200':
 *         description: Usuario autenticado correctamente
 *       '401':
 *         description: Credenciales inválidas
 *       '500':
 *         description: Error interno del servidor
 */

export default router;