import type { Note, NoteFormData, Project, Task } from "../types"
import api from "@/lib/axios"
import { ensureResponseData, throwApiError } from "./apiError"

type NoteApiType = {
    formData:NoteFormData
    projectId:Project['_id']
    taskId:Task['_id']
    noteId:Note['_id']
}

export async function createNote({projectId, taskId, formData} : 
    Pick<NoteApiType, 'formData'|'projectId'|'taskId'>) {

    try {
        const {data} = await api.post<string>(`/projects/${projectId}/tasks/${taskId}/notes`, formData)
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida.")
    } catch (error) {
        throwApiError(error)
    }
}
export async function deleteNote({projectId, taskId, noteId} : 
    Pick<NoteApiType, 'projectId'|'taskId'|'noteId'>) {

    try {
        const {data} = await api.delete<string>(`/projects/${projectId}/tasks/${taskId}/notes/${noteId}`)
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida.")
    } catch (error) {
        throwApiError(error)
    }
}
