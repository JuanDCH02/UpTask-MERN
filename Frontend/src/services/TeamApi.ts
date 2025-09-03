import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { teamMembersSchema, type Project, type TeamMember, type TeamMemberForm } from "../types";

export async function findUserbyEmail({projectId, formData}:{projectId:Project['_id'],
    formData: TeamMemberForm}) {

    try {
        const {data} = await api.post(`/projects/${projectId}/team/find`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error (error.response.data.error)
        }
    }
}
export async function addUserToProject({projectId, id} : {projectId:Project['_id'],
    id: TeamMember['_id']}) {

    try {
        const {data} = await api.post<string>(`/projects/${projectId}/team`, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error (error.response.data.error)
        }
    }
}
export async function getProjectTeam(projectId : Project['_id']) {

    try {
        const {data} = await api.get(`/projects/${projectId}/team`)
        const res = teamMembersSchema.safeParse(data)
        if(res.success) return res.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error (error.response.data.error)
        }
    }
}
export async function removeUserFromProject({projectId, id} : {projectId:Project['_id'],
    id: TeamMember['_id']}) {

    try {
        const {data} = await api.delete<string>(`/projects/${projectId}/team/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error (error.response.data.error)
        }
    }
}