import type {Request,Response } from 'express'
import Project from '../models/Project'

export class ProjectController {

    static CreateProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)
            //assign a manager
        project.manager = req.user.id
        try {
            await project.save()
            return res.send('Proyecto creado correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static GetAllProjects = async (req: Request, res: Response) => {
        try {
                //show the projects where the user is manager or teamMember
            const projects = await Project.find({
                $or:[
                    { manager:{$in: req.user.id} },
                    { team:{$in: req.user.id} },
                ]
            }).populate('tasks')
            return res.json(projects)
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
                // can't get the project if user isn't manager or teamMember
            if(project.manager.toString() !== req.user.id.toString() 
                && !project.team.includes(req.user.id)) {
                return res.json({error: 'Falta de permisos'})
            }
            return res.json(project)
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
            if(project.manager.toString() !== req.user.id.toString()) {
                return res.json({error: 'Falta de permisos'})
            }
            project.projectName = req.body.projectName
            project.clientName = req.body.clientName
            project.description = req.body.description
            await project.save()
            return res.send('Proyecto actualizado')
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
            if(project.manager.toString() !== req.user.id.toString()) {
                return res.json({error: 'Falta de permisos'})
            }
            await project.deleteOne()
            return res.send('Proyecto eliminado')
        } catch (error) {
            console.log(error)
        }
    }
}