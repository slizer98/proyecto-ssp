import nodemailer from 'nodemailer';

const emailRegistro = async(datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS 
        }
      });

      const { nombre, email, token, AIMID } = datos;

      // enviar el correo
      await transport.sendMail({
        from: 'AsociacionMecatronica.com',
        to: email,
        subject: 'Confirma tu cuenta en AsociacionMecatronica.com',
        text: 'Confirma tu cuenta en AsociacionMecatronica.com',
        html: `
            <h3>Hola ${nombre}, Confirma tu cuenta en AsociacionMecatronica.com</h3>
            <p>Tu cuenta ya esta lista solo debes confirmarla en el siguiente enlace:
            <a href="${process.env.BACK_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta </a></p>
            <p>Tu AIMID: ${AIMID}</p>
            <p> Si no has creado una cuenta en AsociacionMecatronica.com, ignora este correo</p>
        `
      });
};

const emailOlvidePassword = async(datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const { nombre, email, token } = datos;

      // enviar el correo
      await transport.sendMail({
        from: 'AsociacionMecatronica.com',
        to: email,
        subject: 'Reestaablece tu password en AsociacionMecatronica.com',
        text: 'Reestaablece tu password en AsociacionMecatronica.com',
        html: `
            <h3>Hola ${nombre}, has solicitado reestablecer tu password en AsociacionMecatronica.com</h3>
            <p>sigue el siguiente enlace para reestablecer tu password:
            <a href="${process.env.BACK_URL}:${process.env.PORT ?? 3000}/auth/recuperar-password/${token}">Reestablecer Password</a></p>
            <p> Si tu no solicitaste el cambio de password, puedes ignorar este mensaje.</p>
        `
      });
};

export { 
    emailRegistro,
    emailOlvidePassword
};