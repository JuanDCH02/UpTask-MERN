import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { hasAuthorization, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

const router = Router()

    //check all routes for authentication
router.use(authenticate)

    //ROUTES FOR PROJECTS
router.post('/', 
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
    router.param('projectId', projectExists)
    router.param('taskId',taskExists )

router.post('/:projectId/tasks',
    hasAuthorization,
    body('taskName')
        .notEmpty().withMessage('El nombre de la tarea es obligatoria'),
    body('description')
        .notEmpty().withMessage('La descripcion es obligatoria'),
    TaskController.CreateTask
)

router.get('/:projectId/tasks',
    TaskController.GetTasks
)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.GetTasksById
)

router.put('/:projectId/tasks/:taskId',
    hasAuthorization,
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('taskName')
        .notEmpty().withMessage('El nombre de la tarea es obligatoria'),
    body('description')
        .notEmpty().withMessage('La descripcion es obligatoria'),
    handleInputErrors,
    TaskController.UpdateTask
)

router.delete('/:projectId/tasks/:taskId',
    hasAuthorization,
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
    //PROJECT MEMBERS

router.post('/:projectId/team/find',
    body('email')
        .isEmail().toLowerCase().withMessage('Email no válido'),
    handleInputErrors,
    TeamMemberController.findMemberByEmail
)
router.get('/:projectId/team',
    TeamMemberController.getMembers
)
router.post('/:projectId/team',
    body('id')
        .isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TeamMemberController.addMember
)
router.delete('/:projectId/team/:userId',
    param('userId')
        .isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TeamMemberController.removeMember
)
    // TASK NOTES

router.post('/:projectId/tasks/:taskId/notes',
    body('content')
        .notEmpty().withMessage('La nota no puede estar vacio'),
    handleInputErrors,
    NoteController.createNote
)
router.get('/:projectId/tasks/:taskId/notes',
    handleInputErrors,
    NoteController.getTaskNotes
)
router.delete('/:projectId/tasks/:taskId/notes/:noteId',
    param('noteId')
        .isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    NoteController.deleteNote
)

export default router;