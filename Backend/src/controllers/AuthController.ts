import type { Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../models/User";
import Token from "../models/Token";
import { AuthEmail } from "../emails/AuthEmails";

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
            user.password = await bcrypt.hash(req.body.password, 10)
            //generate token
            const token = new Token()
            token.token = Math.floor(100000 + Math.random() * 900000).toString()
            token.user = user.id
            //send email
            AuthEmail.sendEmailConfirmation({
                email: user.email,
                name: user.name,
                token: token.token,
            })
            //save in db
            await Promise.allSettled([user.save(),token.save()])
            res.send('Cuenta Creada. Revisa tu Email para confirmarla')

        } catch (error) {
            res.status(500).json({error:'Error al Registrar Usuario'})
        }
    }
}