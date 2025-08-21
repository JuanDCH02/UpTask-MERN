import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";



const router = Router()

router.post('/create-account', 
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('password')
        .isLength({min:8}).withMessage('La contraseña debe ser de al menos 8 caracteres'),
    body('password_confirmation')
        .custom((value, {req}) => {
            if(value != req.body.password){
                throw new Error('La contraseña no es igual')
            }
            return true
        }),
    body('email')
        .isEmail().withMessage('El email no es valido'),
        handleInputErrors,
    AuthController.createAccount
)


export default router