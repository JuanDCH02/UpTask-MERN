import type {IUser} from "../models/User"
import Token from "../models/Token"
import { AuthEmail } from "../emails/AuthEmails"
import bcrypt from 'bcrypt'



export const createAndSendToken = async(user: IUser) => {
    //generate token
    const token = new Token()
    token.user = user.id
    token.token = Math.floor(100000 + Math.random() * 900000).toString()
    //send email
    AuthEmail.sendEmailConfirmation({
        email: user.email,
        name: user.name,
        token: token.token,
    })
    return token
}

export const hashPassword = async(password: string)=> {
    return await bcrypt.hash(password, 10)
}
export const checkPassword = async (enteredPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(enteredPassword, hashedPassword)
}