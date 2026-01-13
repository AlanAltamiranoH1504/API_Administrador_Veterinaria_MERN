import nodemailer, {SendMailOptions, Transporter} from "nodemailer"
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import client from '../config/Brevo';
import {email_confirm_user, email_to_confirm_account_brevo, email_to_reset_password} from "../types"

export const email_confirm_user_function = async (data: email_confirm_user) => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: +process.env.NODEMAILER_HOST,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMIALER_PASSWORD
        }
    });
    const email_options: SendMailOptions = {
        from: process.env.EMAIL_APP,
        to: data.email,
        subject: "Confirma tu cuenta y empieza a administrar tus pacientes de veterinaria",
        text: "Confirma tu cuenta y empieza a administrar tus pacientes de veterinaria",
        html: `
            <div style="style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f8f8; border-radius: 10px;"">
                <h2 style="color: #2c3e50;">Hola ${data.nombre},</h2>

               <p style="font-size: 16px; color: #333;">
                   Gracias por registrarte en <strong>Admin-Vet</strong>. Para activar tu cuenta, por favor confirma tu dirección de correo electrónico haciendo clic en el siguiente enlace e ingresando el siguiente código:
               </p>
               
               <p style="font-size: 20px; color: black; text-align: center; font-weight: bolder; text-transform: uppercase">${data.six_digit_token}</p>

               <p style="text-align: center; margin: 30px 0;">
                   <a href="${process.env.FRONTEND_URL}/auth/confirmar/${data.token}" 
                      style="display: inline-block; padding: 12px 25px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                       Confirmar Cuenta
                   </a>
               </p>

               <p style="font-size: 14px; color: #666;">
                   Si tú no creaste esta cuenta, puedes ignorar este mensaje sin problemas.
               </p>

               <p style="font-size: 14px; color: #999; margin-top: 40px;">
                   \&copy; ${new Date().getFullYear()} UpTask. Todos los derechos reservados.
               </p>
            </div>

        `
    }
    await transporter.sendMail(email_options);
}

export const email_to_reset_password_function = async (data: email_to_reset_password) => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: +process.env.NODEMAILER_PORT,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMIALER_PASSWORD
        }
    });
    const email_options: SendMailOptions = {
        from: process.env.EMAIL_APP,
        to: data.email,
        subject: "Actualiza tu contraseña",
        text: "Actualiza tu contraseña",
        html: `
             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f8f8; border-radius: 10px;">
                <h2 style="color: #2c3e50;">Hola ${data.nombre},</h2>
                <p style="font-size: 16px; color: #333;">
                    Has solicitado restablecer tu password en <strong>Administrador de Veterinaria</strong>. Para reestablecerla, por favor haz clic en el siguiente enlace e ingresa el siguiente codigo:
                </p>
                
                <h3 style="font-weight: bolder; text-align: center">${data.six_digit_token}</h3>
                <p style="text-align: center; margin: 30px 0;">
                    <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${data.token}" 
                       style="display: inline-block; padding: 12px 25px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Recuperar Password
                    </a>
                </p>
                <p style="font-size: 14px; color: #666;">
                    Si tú no solicitaste restablecer tu password, puedes ignorar este mensaje sin problemas.
                </p>
                <p style="font-size: 14px; color: #999; margin-top: 40px;">
                    &copy; ${new Date().getFullYear()} Administrador de Veterinaria. Todos los derechos reservados.
                </p>
            </div>
        `
    }
    await transporter.sendMail(email_options);
}

export const sendEmail = async (data: email_to_confirm_account_brevo) => {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi(client);

    const sendSmtpEmail: SibApiV3Sdk.SendSmtpEmail = {
        to: [{ email: data.email }],
        templateId: 1,
        params: {
            nombre: data.nombre,
            codigo :data.token
        },
        sender: {
            name:  'Tu Empresa',
            email: 'no-reply@tuempresa.com',
        },
    };

    try {
        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email enviado:', response);
        return response;
    } catch (error) {
        console.error('Error al enviar email:', error.message);
        throw error;
    }
};