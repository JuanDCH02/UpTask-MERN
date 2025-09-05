import { Request, Response, NextFunction } from "express"
import Task, { ITask } from "../models/Task"

//add the param task to the interface Request
declare global {
    namespace Express {
        interface Request{
            task: ITask
        }
    }
}

export async function taskExists(req:Request, res: Response, next: NextFunction) {
    try {
        const task = await Task.findById(req.params.taskId)
        if(!task) {
            return res.status(404).json({error: 'Tarea no encontrado'})
        }
        //add the task into req 
        req.task = task
        //check if the task belongs to the project
        if(req.task.project.toString() !== req.project.id.toString()){
            return res.status(406).json({error: 'La tarea no pertenece a este proyecto'})
        }
        next()
    } catch (error) {
        res.status(500).json({error: 'hubo un error'})
    }
}
export async function hasAuthorization(req:Request, res: Response, next: NextFunction){
    if(req.user.id.toString() !== req.project.manager.toString()){
        return res.status(406).json({error: 'Falta de permisos'})
    }
    next()
}