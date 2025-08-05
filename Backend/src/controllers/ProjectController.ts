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
        try {
            const projects = await Project.find({})
            res.json(projects).send('obteniendo proyectos')
        } catch (error) {
            console.log(error)
        }
    }

    static GetProjectById = async (req: Request, res: Response) => {
        try {
            const project = await Project.findById(req.params.id).populate('tasks')
            
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
            const project = await Project.findById(req.params.id)
            if(!project) {
                return res.status(404).json({error: 'Proyecto no encontrado'})
            } 
            project.projectName = req.project.projectName
            project.clientName = req.project.clientName
            project.description = req.project.description
            await project.save()
            res.send('proyecto actualizado')
        } catch (error) {
            console.log(error)
        }
        res.send('obteniendo proyectos')
    }

    static DeleteProject = async (req: Request, res: Response) => {
        try {
            const project = await Project.findById(req.params.id)
            if(!project) {
                return res.status(404).json({error: 'Proyecto no encontrado'})
            } 
            await project.deleteOne()
            res.send('Proyecto eliminado')
        } catch (error) {
            console.log(error)
        }
    }
}