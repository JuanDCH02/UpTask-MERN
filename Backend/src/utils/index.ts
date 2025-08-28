import type {IUser} from "../models/User"
import Token from "../models/Token"
import type { IToken } from "../models/Token"
import { AuthEmail } from "../emails/AuthEmails"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Types } from "mongoose"


    //TOKENS
export const createToken = (user: IUser) => {
    //generate token
    const token = new Token()
    token.user = user.id
    token.token = Math.floor(100000 + Math.random() * 900000).toString()
    return token
}
export const sendToken = (user: IUser, token: IToken) => {
    AuthEmail.sendEmailConfirmation({
        email: user.email,
        name: user.name,
        token: token.token,
    })
}
export const changePassword = (user: IUser, token: IToken) => {
    AuthEmail.sendPasswordReset({
        email: user.email,
        name: user.name,
        token: token.token,
    })
}

    //PASSWORD
export const hashPassword = async(password: string)=> {
    return await bcrypt.hash(password, 10)
}
export const checkPassword = async (enteredPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(enteredPassword, hashedPassword)
}

    //JWT

export const generateJWT = (payload: Types.ObjectId)=> {
    const token = jwt.sign({ id: payload }, process.env.JWT_SECRET, {
        expiresIn:'1m'
    })
    return token
}