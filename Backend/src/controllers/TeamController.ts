import type {Request,Response } from 'express'
import User from '../models/User'
import Project from '../models/Project'


export class TeamMemberController {
    static findMemberByEmail = async (req: Request, res: Response) => {
        const {email} = req.body
        const user = await User.findOne({email}).select('id email name')
        if(!user) return res.status(404).json({error: 'Usuario no encontrado'})
        return res.json(user)
    }

    static addMember = async (req: Request, res: Response) => {
        const {id} = req.body
        const user = await User.findById(id).select('id')
        if(!user) return res.status(404).json({error: 'Usuario no encontrado'})
            //avoid duplicates members
        if(req.project.team.some(team => team.toString() === user.id.toString())){
            return res.status(409).json({error: 'Usuario ya existente en el proyecto'})
        }
            //add member to the project
        req.project.team.push(user.id)
        await req.project.save()
        return res.send('Usuario agregado correctamente')
    }

    static removeMember = async (req: Request, res: Response) => {
        const {userId} = req.params
        if(!req.project.team.some(team => team.toString() === userId)){
            return res.status(409).json({error: 'Usuario no existente en el proyecto'})
        }
        req.project.team = req.project.team.filter( member => member.toString() !== userId)
        await req.project.save()
        return res.send('Usuario removido correctamente')
    }
    static getMembers = async (req: Request, res: Response) => {
        const project = await Project.findById(req.project.id).populate({
            path: 'team',
            select:'id name email'
        })
        res.json(project.team)
    }
}