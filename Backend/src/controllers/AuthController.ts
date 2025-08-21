import type { Request, Response } from "express";
import bcrypt from 'bcrypt'
import User from "../models/User";

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
            await user.save()
            res.send('Cuenta Creada. Revisa tu Email para confirmarla')
        } catch (error) {
            res.status(500).json({error:'Error al Registrar Usuario'})
        }
    }
}