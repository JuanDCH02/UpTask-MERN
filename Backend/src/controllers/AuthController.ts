import type { Request, Response } from "express";
import User from "../models/User";
import Token from "../models/Token";
import { changePassword, checkPassword, createToken, hashPassword, sendToken } from "../utils";

export class AuthController {

    static createAccount = async (req:Request, res:Response)=> {
        try {
            //prevent duplicates
            const {password, email} = req.body
            const userExists = await User.findOne({email})
            if(userExists){
                return res.status(409).json({error:'El usuario a está registrado'})
            }
            const user = new User(req.body) 
            //hash password
            user.password = await hashPassword(password)
            const token = createToken(user)
            sendToken(user, token)
            //save in db
            await Promise.allSettled( [user.save(), token.save()] )
            res.send('Cuenta creada. Revisa tu email para confirmarla')

        } catch (error) {
            res.status(500).json({error:'Error al registrar usuario'})
        }
    }
    static requestConfirmationCode = async (req:Request, res:Response)=> {
        try {
            const { email} = req.body
            const user = await User.findOne({email})

            if(!user) return res.status(409).json({error:'El usuario NO a está registrado'})
            if(user.confirmed) return res.status(403).json({error:'El usuario ya está confirmado'})

            const token = createToken(user)
            sendToken(user, token)
            await Promise.allSettled( [user.save(), token.save()] )
            res.send('Se envió un nuevo token a tu email')

        } catch (error) {
            res.status(500).json({error:'Error al registrar usuario'})
        }
    }
    static confirmAccount = async (req:Request, res:Response)=> {
        try {
            //check if the token is available
            const {token} = req.body
            const tokenExists = await Token.findOne({token})
            if(!tokenExists) res.status(404).json({error:'Token no válido'})
            //find the user this token belongs and change their status
            const user = await User.findById(tokenExists.user)
            user.confirmed = true
            //update user status and delete token
            await Promise.allSettled( [user.save(), tokenExists.deleteOne() ])
            res.status(200).send('Cuenta confirmada correctamente')

        } catch (error) {
            res.status(500).json({error:'Error al registrar usuario'})
        }
    }
    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

            if (!user.confirmed) {
                const token = createToken(user)
                sendToken(user, token)
                await token.save()
                return res.status(401).json({ error: 'La cuenta NO ha sido confirmada, enviamos un e-mail de confirmación!' })
            }
            const passwCorrect = await checkPassword(password, user.password)
            if (!passwCorrect) {
                return res.status(401).json({ error: 'Contraseña incorrecta' })
            }
      
            res.send('Autenticado')
        }  catch (error) {
                res.status(500).json({ error: 'Error al hacer login' })
        }
    }
    static forgotPassword = async (req:Request, res:Response)=> {
        try {
            const { email} = req.body
            const user = await User.findOne({email})

            if(!user) return res.status(409).json({error:'El usuario NO a está registrado'})

            const token = createToken(user)
            changePassword(user, token)
            await token.save()
            res.send('Se envió un nuevo token a tu email')

        } catch (error) {
            res.status(500).json({error:'Error al registrar usuario'})
        }
    }

}