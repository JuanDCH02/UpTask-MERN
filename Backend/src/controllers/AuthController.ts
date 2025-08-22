import type { Request, Response } from "express";
import User from "../models/User";
import Token from "../models/Token";
import { checkPassword, createAndSendToken, hashPassword } from "../utils";

export class AuthController {

    static createAccount = async (req:Request, res:Response)=> {
        try {
            //prevent duplicates
            const {password, email} = req.body
            const userExists = await User.findOne({email})
            if(userExists){
                return res.status(409).json({error:'El Usuario a está Registrado'})
            }
            const user = new User(req.body) 
            //hash password
            user.password = await hashPassword(password)
            const token = await createAndSendToken(user)
            //save in db
            await Promise.allSettled( [user.save(), token.save()] )
            res.send('Cuenta Creada. Revisa tu Email para confirmarla')

        } catch (error) {
            res.status(500).json({error:'Error al Registrar Usuario'})
        }
    }
    static confirmAccount = async (req:Request, res:Response)=> {
        try {
            //check if the token is available
            const {token} = req.body
            const tokenExists = await Token.findOne({token})
            if(!tokenExists) res.status(404).json({error:'Token No Valido'})
            //find the user this token belongs and change their status
            const user = await User.findById(tokenExists.user)
            user.confirmed = true
            //update user status and delete token
            await Promise.allSettled( [user.save(), tokenExists.deleteOne() ])
            res.status(200).send('Cuenta Confirmada Correctamente')

        } catch (error) {
            res.status(500).json({error:'Error al Registrar Usuario'})
        }
    }
    static login = async (req:Request, res:Response)=>{
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            //cheking user status
            if(!user ) return res.status(404).json({error:'Usuario No Encontrado'})
            if(!user.confirmed ){
                const token = await createAndSendToken(user)
                await token.save()
                return res.status(401).json({error:'La Cuenta NO ha sido Confirmada, Enviamos un e-mail de confirmacion!'})
            } 
            //cheking password
            const passwCorrect = checkPassword(password, user.password)
            if(!passwCorrect) res.status(401).json({error:'Contraseña Incorrecta'})
            res.send('Autenticado')

        } catch (error) {
            res.status(500).json({error:'Error al Hacer Login'})
        }
    }
}