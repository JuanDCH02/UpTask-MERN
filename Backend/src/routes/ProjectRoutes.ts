import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";


const router = Router()
router.post('/', ProjectController.CreateProject)
router.get('/', ProjectController.GetAllProjects)




export default router;