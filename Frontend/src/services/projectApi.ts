import { isAxiosError } from "axios"
import { DashboardProjectsSchema, EditProjectSchema, ProjectSchema, type ProjectFormData } from "../types"
import api from "@/lib/axios"
import type { Project } from "../types"

export async function createProject(formData: ProjectFormData) {
    try {
        const {data} = await api.post<string>('/projects', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function getProjects() { 
    try {
        const {data} = await api('/projects')
        const result = DashboardProjectsSchema.safeParse(data)
        if(result.success) return result.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function getProjectById(projectId: Project['_id']) {
    try {
        const {data} = await api(`/projects/${projectId}`)
        const result = EditProjectSchema.safeParse(data)
        if(result.success) return result.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function getFullProject(projectId: Project['_id']) {
    try {
        const {data} = await api(`/projects/${projectId}`)
        const result = ProjectSchema.safeParse(data)
        if(result.success) return result.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
type ProjectApiType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}
export async function UpdateProject({formData, projectId} : ProjectApiType) {
    try {
        const {data} = await api.put<string>(`/projects/${projectId}`,formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function DeleteProject(projectId: Project['_id']) {
    try {
        const {data} = await api.delete<string>(`/projects/${projectId}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}