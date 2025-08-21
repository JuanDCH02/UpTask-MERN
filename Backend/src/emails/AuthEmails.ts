import { transporter } from "../config/nodemailer";

interface IEmail {
    email:string
    name:string
    token:string
}

export class AuthEmail {
    static sendEmailConfirmation = async(user : IEmail)=> {
        const info = await transporter.sendMail({
                from: 'UpTask <admin@uptask.com>',
                to: user.email,
                subject: 'Uptask - Confirmar Cuenta',
                html:
                `<p>Hola ${user.name}, has creado tu cuenta en upTask, ahora debes confirmarla.</p>
                <p>Visita este enlace</p>
                <a href=''> Confirmar Cuenta</a>
                <p>E ingresa el siguiente codigo: <b>${user.token}</b></p>
                <p>Este token solo dura 15 minutos</p>
                `
            })
        console.log('Mensaje enviado', info.messageId)
    }
}