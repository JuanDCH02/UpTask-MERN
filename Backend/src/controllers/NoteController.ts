import type { Request, Response } from "express";
import Note, {INote} from "../models/Note";



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
} 