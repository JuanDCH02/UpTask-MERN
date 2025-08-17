import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { type TaskFormData, type Project, type Task } from "../types";

type TaskAPi = {
    formData: TaskFormData,
    projectId: Project['_id']
    taskId: Task['_id']
}

export async function createTask({formData, projectId}: Pick<TaskAPi, 'formData'|'projectId'>) {
    try {
        const url = (`/projects/${projectId}/tasks`)
        const {data} = await api.post<string>(url, formData)
        return data 
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error (error.response.data.error)
        }
    }
}

export async function getTaskbyId({projectId, taskId}: Pick<TaskAPi, 'taskId'|'projectId'>) {
    try {
        const url = `projects/${projectId}/tasks/${taskId}`
        const {data} = await api(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error (error.response.data.error)
        }
    }
}
export async function updateTask({projectId, taskId, formData}: Pick<TaskAPi, 'taskId'|'projectId'|'formData'>) {
    try {
        const url = `projects/${projectId}/tasks/${taskId}`
        const {data} = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error (error.response.data.error)
        }
    }
}