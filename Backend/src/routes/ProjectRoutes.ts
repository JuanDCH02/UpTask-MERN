import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router()

router.post('/', 
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es obligatoria'),
    handleInputErrors,
    ProjectController.CreateProject)

router.get('/', ProjectController.GetAllProjects)

router.get('/:id', 
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es obligatoria'),
    param('id')
        .isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.GetProjectById)

router.put('/:id', 
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es obligatoria'),
    param('id')
        .isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.UpadateProject)

router.delete('/:id',
    param('id')
        .isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.DeleteProject)



export default router;