import type { Request, Response } from "express";
import Token from "../models/Token";
import User from "../models/User";
import { changePassword, checkPassword, createToken, generateJWT, hashPassword } from "../utils";

export class AuthController {

    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body
            const userExists = await User.findOne({ email })

            if (userExists) {
                return res.status(409).json({ error: "El usuario ya esta registrado" })
            }

            const user = new User(req.body)
            user.password = await hashPassword(password)
            user.confirmed = true

            await user.save()
            res.send("Cuenta creada correctamente. Ya puedes iniciar sesion")
        } catch (error) {
            res.status(500).json({ error: "Error al registrar usuario" })
        }
    }

    static requestConfirmationCode = async (_req: Request, res: Response) => {
        try {
            res.status(200).send("Ya no necesitas solicitar un codigo de confirmacion. Puedes iniciar sesion directamente.")
        } catch (error) {
            res.status(500).json({ error: "Error al procesar la solicitud" })
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body ?? {}

            if (!token) {
                return res.status(200).send("Tu cuenta ya no necesita confirmacion. Puedes iniciar sesion directamente.")
            }

            const tokenExists = await Token.findOne({ token })

            if (!tokenExists) {
                return res.status(200).send("Tu cuenta ya no necesita confirmacion. Puedes iniciar sesion directamente.")
            }

            const user = await User.findById(tokenExists.user)

            if (user) {
                user.confirmed = true
                await user.save()
            }

            await tokenExists.deleteOne()

            res.status(200).send("Tu cuenta ya esta lista para iniciar sesion.")
        } catch (error) {
            res.status(500).json({ error: "Error al confirmar la cuenta" })
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" })
            }

            const passwCorrect = await checkPassword(password, user.password)

            if (!passwCorrect) {
                return res.status(401).json({ error: "Contrasena incorrecta" })
            }

            if (!user.confirmed) {
                user.confirmed = true
                await user.save()
            }

            const token = generateJWT(user.id)
            res.send(token)
        } catch (error) {
            res.status(500).json({ error: "Error al hacer login" })
        }
    }

    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(409).json({ error: "El usuario no esta registrado" })
            }

            const token = createToken(user)
            changePassword(user, token)
            await token.save()
            res.send("Se envio un nuevo token a tu email")
        } catch (error) {
            res.status(500).json({ error: "Error al registrar usuario" })
        }
    }

    static validateToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            const tokenExists = await Token.findOne({ token })

            if (!tokenExists) {
                return res.status(404).json({ error: "Token no valido" })
            }

            res.status(200).send("Token valido. Crea tu nueva contrasena")
        } catch (error) {
            res.status(500).json({ error: "Error al registrar usuario" })
        }
    }

    static updatePasswordWithToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.params
            const { password } = req.body
            const tokenExists = await Token.findOne({ token })

            if (!tokenExists) {
                return res.status(404).json({ error: "Token no valido" })
            }

            const user = await User.findById(tokenExists.user)

            if (!user) {
                await tokenExists.deleteOne()
                return res.status(404).json({ error: "Usuario no encontrado" })
            }

            user.password = await hashPassword(password)

            await Promise.allSettled([user.save(), tokenExists.deleteOne()])
            res.status(200).send("Contrasena modificada con exito")
        } catch (error) {
            res.status(500).json({ error: "Error al registrar usuario" })
        }
    }

    static user = async (req: Request, res: Response) => {
        return res.json(req.user)
    }

    static updateProfile = async (req: Request, res: Response) => {
        const { name, email } = req.body

        const userExists = await User.findOne({ email })
        if (userExists && userExists.id.toString() !== req.user.id.toString()) {
            return res.status(409).json({ error: "Email ya esta en uso" })
        }

        req.user.name = name
        req.user.email = email

        try {
            await req.user.save()
            res.status(200).send("Usuario actualizado con exito")
        } catch (error) {
            res.status(500).json({ error: "Error al modificar al usuario" })
        }
    }

    static updateProfilePassword = async (req: Request, res: Response) => {
        const { password, current_password } = req.body
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" })
        }

        const passwCorrect = await checkPassword(current_password, user.password)
        if (!passwCorrect) {
            return res.status(401).json({ error: "Contrasena incorrecta" })
        }

        try {
            user.password = await hashPassword(password)
            await user.save()
            res.status(200).send("Usuario actualizado con exito")
        } catch (error) {
            res.status(500).json({ error: "Error al modificar al usuario" })
        }
    }

    static checkPassword = async (req: Request, res: Response) => {
        const { password } = req.body
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" })
        }

        const passwCorrect = await checkPassword(password, user.password)
        if (!passwCorrect) {
            return res.status(401).json({ error: "Contrasena incorrecta" })
        }

        res.send("Contrasena correcta")
    }
}
