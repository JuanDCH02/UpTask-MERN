import { Router } from "express";
import { body, param } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { authenticate } from "../middleware/auth";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post(
    "/create-account",
    body("name")
        .notEmpty().withMessage("El nombre es obligatorio"),
    body("password")
        .isLength({ min: 8 }).withMessage("La contrasena debe ser de al menos 8 caracteres"),
    body("password_confirmation")
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error("La contrasena no es igual")
            }
            return true
        }),
    body("email")
        .isEmail().withMessage("El email no es valido"),
    handleInputErrors,
    AuthController.createAccount
)

router.post("/confirm-account", AuthController.confirmAccount)

router.post(
    "/login",
    body("password")
        .notEmpty().withMessage("La contrasena es obligatoria"),
    body("email")
        .isEmail().withMessage("El email no es valido"),
    handleInputErrors,
    AuthController.login
)

router.post("/request-code", AuthController.requestConfirmationCode)

router.post(
    "/forgot-password",
    body("email")
        .isEmail().withMessage("El email no es valido"),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post(
    "/validate-token",
    body("token")
        .notEmpty().withMessage("El token es obligatorio"),
    handleInputErrors,
    AuthController.validateToken
)

router.post(
    "/update-password/:token",
    param("token")
        .isNumeric().withMessage("Token no valido"),
    body("password")
        .isLength({ min: 8 }).withMessage("La contrasena debe ser de al menos 8 caracteres"),
    body("password_confirmation")
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error("La contrasena no es igual")
            }
            return true
        }),
    handleInputErrors,
    AuthController.updatePasswordWithToken
)

router.get(
    "/user",
    authenticate,
    AuthController.user
)

router.put(
    "/profile",
    authenticate,
    body("name")
        .notEmpty().withMessage("El nombre es obligatorio"),
    body("email")
        .isEmail().withMessage("El email no es valido"),
    handleInputErrors,
    AuthController.updateProfile
)

router.post(
    "/password",
    authenticate,
    body("current_password")
        .notEmpty().withMessage("La contrasena actual es obligatorio"),
    body("password")
        .isLength({ min: 8 }).withMessage("La contrasena debe ser de al menos 8 caracteres"),
    body("password_confirmation")
        .custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error("La contrasena no es igual")
            }
            return true
        }),
    handleInputErrors,
    AuthController.updateProfilePassword
)

router.post(
    "/check-password",
    authenticate,
    body("password")
        .notEmpty().withMessage("La contrasena es obligatorio"),
    handleInputErrors,
    AuthController.checkPassword
)

export default router
