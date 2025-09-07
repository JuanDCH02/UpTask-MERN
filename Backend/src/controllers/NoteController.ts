import type { Request, Response } from "express";
import Note, {INote} from "../models/Note";
import { Types } from "mongoose";

type NoteParams = 
{
    noteId: Types.ObjectId
}

export class NoteController {
    static createNote = async (req:Request<{},{},INote >, res:Response)=> {
            //create the note and fill the fields
        const {content} = req.body
        const note = new Note()
        note.content = content
        note.createdBy = req.user.id
        note.task = req.task.id
            //push the note into the task
        req.task.notes.push(note.id)

        try {
            await Promise.allSettled([ req.task.save(), note.save() ])
            return res.send('Nota creada correctamente')
        } catch (error) {
            return res.status(500).json({error:'Error al crear la nota'})
        }
    }
    static getTaskNotes = async (req:Request, res:Response)=> {
        try {
            const notes = await Note.find({task: req.task.id})
            return res.json(notes)
        } catch (error) {
            return res.status(500).json({error:'Error al obtener las notas'})
        }
    }
    static deleteNote = async (req:Request<NoteParams>, res:Response)=> {
        const {noteId} = req.params
        const note = await Note.findById(noteId)

        if(!note) return res.status(404).json({error: 'Nota no encontrado'})
        if(note.createdBy.toString() !== req.user.id.toString()) 
            return res.status(401).json({error: 'Falta de permisos'})
            //also remove the note from the tasklist
        req.task.notes = req.task.notes.filter(note => note.toString() !== noteId.toString())

        try {
            await Promise.allSettled([ req.task.save(), note.deleteOne() ])
            return res.send('Nota eliminada correctamente')
        } catch (error) {
            return res.status(500).json({error:'Error al eliminar la nota'})  
        }
    }
       
} 