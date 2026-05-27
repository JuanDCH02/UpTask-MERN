import { DashboardProjectsSchema, EditProjectSchema, ProjectSchema, type ProjectFormData } from "../types"
import api from "@/lib/axios"
import type { Project } from "../types"
import { ensureResponseData, throwApiError } from "./apiError"

export async function createProject(formData: ProjectFormData) {
    try {
        const {data} = await api.post<string>('/projects', formData)
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida al crear el proyecto.")
    } catch (error) {
        throwApiError(error)
    }
}
export async function getProjects() { 
    try {
        const {data} = await api('/projects')
        const result = DashboardProjectsSchema.safeParse(data)
        if(result.success) return result.data
        throw new Error("La lista de proyectos no tiene el formato esperado.")
    } catch (error) {
        throwApiError(error)
    }
}
export async function getProjectById(projectId: Project['_id']) {
    try {
        const {data} = await api(`/projects/${projectId}`)
        const result = EditProjectSchema.safeParse(data)
        if(result.success) return result.data
        throw new Error("La respuesta del proyecto no tiene el formato esperado.")
    } catch (error) {
        throwApiError(error)
    }
}
export async function getFullProject(projectId: Project['_id']) {
    try {
        const {data} = await api(`/projects/${projectId}`)
        const result = ProjectSchema.safeParse(data)
        if(result.success) return result.data
        throw new Error("La respuesta completa del proyecto no tiene el formato esperado.")
    } catch (error) {
        throwApiError(error)
    }
}
type ProjectApiType = {
    formData: ProjectFormData,
    projectId: Project['_id']
}
export async function UpdateProject({formData, projectId} : ProjectApiType) {
    try {
        const {data} = await api.put<string>(`/projects/${projectId}`,formData)
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida.")
    } catch (error) {
        throwApiError(error)
    }
}
export async function DeleteProject(projectId: Project['_id']) {
    try {
        const {data} = await api.delete<string>(`/projects/${projectId}`)
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida.")
    } catch (error) {
        throwApiError(error)
    }
}
