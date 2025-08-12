import { Request, Response, NextFunction } from "express"
import Project, { IProject } from "../models/Project"

//add the param project to the interface Request
declare global {
    namespace Express {
        interface Request{
            project: IProject
        }
    }
}

export async function projectExists(req:Request, res: Response, next: NextFunction) {
    try {
        const project = await Project.findById(req.params.projectId)
        if(!project) {
            return res.status(404).json({error: 'Proyecto No Encontrado'})
        }
        //add the project into req
        req.project = project
        next()
    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}