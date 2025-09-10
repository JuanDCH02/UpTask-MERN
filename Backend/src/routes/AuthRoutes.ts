import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";



const router = Router()

router.post('/create-account', 
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('password')
        .isLength({min:8}).withMessage('La contraseña debe ser de al menos 8 carácteres'),
    body('password_confirmation')
        .custom((value, {req}) => {
            if(value != req.body.password){
                throw new Error('La contraseña no es igual')
            }
            return true
        }),
    body('email')
        .isEmail().withMessage('El email no es válido'),
        handleInputErrors,
    AuthController.createAccount
)
router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('El token es obligatorio'),
        handleInputErrors,
    AuthController.confirmAccount
)
router.post('/login',
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria'),
     body('email')
        .isEmail().withMessage('El email no es válido'),
        handleInputErrors,
    AuthController.login
)
router.post('/request-code',
    body('email')
        .isEmail().withMessage('El email no es válido'),
        handleInputErrors,
    AuthController.requestConfirmationCode
)
router.post('/forgot-password',
    body('email')
        .isEmail().withMessage('El email no es válido'),
        handleInputErrors,
    AuthController.forgotPassword
)
router.post('/validate-token',
    body('token')
        .notEmpty().withMessage('El token es obligatorio'),
        handleInputErrors,
    AuthController.validateToken
)
router.post('/update-password/:token',
    param('token')
        .isNumeric().withMessage('Token no válido'),
    body('password')
        .isLength({min:8}).withMessage('La contraseña debe ser de al menos 8 carácteres'),
    body('password_confirmation')
        .custom((value, {req}) => {
            if(value != req.body.password){
                throw new Error('La contraseña no es igual')
            }
            return true
        }),
        handleInputErrors,
    AuthController.updatePasswordWithToken
)
router.get('/user',
    authenticate,
    AuthController.user
)

    //PROFILE
router.put('/profile', 
    authenticate,
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('email')
        .isEmail().withMessage('El email no es válido'),
        handleInputErrors,
    AuthController.updateProfile
)
router.post('/password', 
    authenticate,
    body('current_password')
        .notEmpty().withMessage('La contraseña actual es obligatorio'),
    body('password')
        .isLength({min:8}).withMessage('La contraseña debe ser de al menos 8 carácteres'),
    body('password_confirmation')
        .custom((value, {req}) => {
            if(value != req.body.password){
                throw new Error('La contraseña no es igual')
            }
            return true
        }),
    handleInputErrors,
    AuthController.updateProfilePassword
)


export default router