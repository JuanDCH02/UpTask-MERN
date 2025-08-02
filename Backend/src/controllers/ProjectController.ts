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
            res.json(projects)
        } catch (error) {
            console.log(error)
        }
        res.send('obteniendo proyectos')
    }

    static GetProjectById = async (req: Request, res: Response) => {
        try {
            const project = await Project.findById(req.params.id)
            if(!project) {
                return res.status(404).json({error: 'Proyecto no encontrado'})
            } 
            res.json(project)
        } catch (error) {
            console.log(error)
        }
        res.send('obteniendo proyectos')
    }

    static UpadateProject = async (req: Request, res: Response) => {
        try {
            const project = await Project.findByIdAndUpdate(req.params.id, req.body)
            if(!project) {
                return res.status(404).json({error: 'Proyecto no encontrado'})
            } 
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