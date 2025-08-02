import type {Request,Response } from 'express'
import Project from '../models/Project'

export class ProjectController {

    static CreateProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)
        
        try {
            await project.save()
            res.send('proyecto creado')
        } catch (error) {
            console.log(error)
        }
    }
    static GetAllProjects = async (req: Request, res: Response) => {
        res.send('obteniendo proyectos')
}
}