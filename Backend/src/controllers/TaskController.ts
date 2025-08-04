import type {Request,Response } from 'express'
import Task from '../models/Task'

export class TaskController {

    static CreateTask = async (req: Request, res: Response) => {
        
        const {project} = req
        try {    
            //create the task and assign it to the project it belongs to.
            const task = new Task(req.body) 
            task.project = project.id
            //add the task to the project tasks array.
            project.tasks.push(task.id)

            await Promise.allSettled([task.save(), project.save()])
            res.status(201)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    static GetTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({project: req.project.id}).populate('project')
            res.status(200).json(tasks)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    static GetTasksById = async (req: Request, res: Response) => {
        try {
            const task = await Task.findById(req.params.taskId)
            if(!task){
                return res.status(404).json({error: 'Tarea no encontrada'})
            }
            if(task.project.toString() !== req.project.id){
                return res.status(406).json({error: 'La tarea no pertenece a este proyecto'})
            }
            res.status(200).json(task)
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    static UpdateTask = async (req: Request, res: Response) => {
        try {
            const task = await Task.findById(req.params.taskId)
            if(!task){
                return res.status(404).json({error: 'Tarea no encontrada'})
            }
            if(task.project.toString() !== req.project.id){
                return res.status(406).json({error: 'La tarea no pertenece a este proyecto'})
            }
            task.taskName = req.body.taskName
            task.description = req.body.description
            await task.save()
            res.status(200).send('Tarea actualizada')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    static DeleteTask = async (req: Request, res: Response) => {
        try {
            const task = await Task.findById(req.params.taskId)
            if(!task){
                return res.status(404).json({error: 'Tarea no encontrada'})
            }
            //delete the task and the ref from the project
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== task.id)
            await Promise.allSettled([task.deleteOne(), req.project.save()])

            res.status(200).json('Tarea eliminada')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }


}