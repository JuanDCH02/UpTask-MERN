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
            res.status(201).send('Tarea creada')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    static GetTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({project: req.project.id}).populate('project')
            res.status(200).json(tasks)
        } catch (error) {
            res.status(400).json({error: 'Hubo un error'})
        }
    }
    static GetTasksById = async (req: Request, res: Response) => {
        try {
            res.json(req.task)
        } catch (error) {
            res.status(404).json({error: 'Tarea No Encontrada'})
        }
    }
    static UpdateTask = async (req: Request, res: Response) => {
        try {
            req.task.taskName = req.body.taskName
            req.task.description = req.body.description
            await req.task.save()
            res.status(200).send('Tarea Actualizada')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    static DeleteTask = async (req: Request, res: Response) => {
        try {
            //delete the task and the ref from the project
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString())
            await Promise.allSettled([req.task.deleteOne(), req.project.save()])

            res.status(200).send('Tarea Eliminada')
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
    static UpdateTaskStatus = async (req: Request, res: Response) => {
        try {
            const {status} = req.body
            req.task.status = status
            if(status === 'pending'){
                req.task.completedBy = null
            }else{
                req.task.completedBy = req.user.id
            }
            await req.task.save()
            res.status(200).send('Estado de la Tarea Actualizado')
        } catch (error) {
            res.status(400).json({error: 'Hubo un error'})
        }
    }


}