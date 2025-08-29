import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";

const router = Router()

    //ROUTES FOR PROJECTS
router.post('/', 
    authenticate,
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es obligatoria'),
    handleInputErrors,
    ProjectController.CreateProject
)

router.get('/', ProjectController.GetAllProjects)

router.get('/:projectId', 
    param('projectId')
        .isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    projectExists,
    ProjectController.GetProjectById
)

router.put('/:projectId', 
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es obligatoria'),
    param('projectId')
        .isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    projectExists,
    ProjectController.UpadateProject
)

router.delete('/:projectId',
    param('projectId')
        .isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    projectExists,
    ProjectController.DeleteProject
)

    //ROUTES FOR TASKS 
    //execute function in every route
    router.param('projectId', projectExists)

router.post('/:projectId/tasks',
    body('taskName')
        .notEmpty().withMessage('El nombre de la tarea es obligatoria'),
    body('description')
        .notEmpty().withMessage('La descripcion es obligatoria'),
    TaskController.CreateTask
)

router.get('/:projectId/tasks',
    TaskController.GetTasks
)
    //execute function in every route
    router.param('taskId',taskExists )

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.GetTasksById
)

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('taskName')
        .notEmpty().withMessage('El nombre de la tarea es obligatoria'),
    body('description')
        .notEmpty().withMessage('La descripcion es obligatoria'),
    handleInputErrors,
    TaskController.UpdateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.DeleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId')
        .isMongoId().withMessage('ID no valido'),
    body('status')
        .notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.UpdateTaskStatus
)


export default router;