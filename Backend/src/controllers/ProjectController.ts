import type {Request,Response } from 'express'
import Project from '../models/Project'

export class ProjectController {

    static CreateProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)
        
        try {
            await project.save()
            res.send('Proyecto Creado Correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static GetAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find()
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
    }

    static GetProjectById = async (req: Request, res: Response) => {
        try {
            const project = await Project.findById(req.params.projectId).populate('tasks')
            
            if(!project) {
                return res.status(404).json({error: 'Proyecto no encontrado'})
            } 
            res.status(200).json(project)
        } catch (error) {
            console.log(error)
        }
    }

    static UpadateProject = async (req: Request, res: Response) => {
        try {
            const project = await Project.findById(req.params.projectId,)
            if(!project) {
                return res.status(404).json({error: 'Proyecto no encontrado'})
            } 
            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description
            await project.save()
            res.send('Proyecto Actualizado')
        } catch (error) {
            console.log(error)
        }
    }

    static DeleteProject = async (req: Request, res: Response) => {
        try {
            const project = await Project.findById(req.params.projectId)
            if(!project) {
                return res.status(404).json({error: 'Proyecto no encontrado'})
            } 
            await project.deleteOne()
            res.send('Proyecto Eliminado')
        } catch (error) {
            console.log(error)
        }
    }
}