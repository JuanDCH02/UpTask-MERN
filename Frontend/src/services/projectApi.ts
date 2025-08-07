import { isAxiosError } from "axios"
import { DashboardProjectsSchema, type ProjectFormData } from "../types"
import api from "@/lib/axios"
import { safeParse } from "zod"

export async function createProject(formData: ProjectFormData) {
    try {
        const {data} = await api.post('/projects', formData)
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