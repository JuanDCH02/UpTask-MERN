import api from "@/lib/axios";
import { teamMembersSchema, type Project, type TeamMember, type TeamMemberForm } from "../types";
import { ensureResponseData, throwApiError } from "./apiError";

export async function findUserbyEmail({projectId, formData}:{projectId:Project['_id'],
    formData: TeamMemberForm}) {

    try {
        const {data} = await api.post(`/projects/${projectId}/team/find`, formData)
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida.")
    } catch (error) {
        throwApiError(error)
    }
}
export async function addUserToProject({projectId, id} : {projectId:Project['_id'],
    id: TeamMember['_id']}) {

    try {
        const {data} = await api.post<string>(`/projects/${projectId}/team`, {id})
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida.")
    } catch (error) {
        throwApiError(error)
    }
}
export async function getProjectTeam(projectId : Project['_id']) {

    try {
        const {data} = await api.get(`/projects/${projectId}/team`)
        const res = teamMembersSchema.safeParse(data)
        if(res.success) return res.data
        throw new Error("La respuesta del equipo no tiene el formato esperado.")
    } catch (error) {
        throwApiError(error)
    }
}
export async function removeUserFromProject({projectId, id} : {projectId:Project['_id'],
    id: TeamMember['_id']}) {

    try {
        const {data} = await api.delete<string>(`/projects/${projectId}/team/${id}`)
        return ensureResponseData(data, "El servidor no devolvio una respuesta valida.")
    } catch (error) {
        throwApiError(error)
    }
}
