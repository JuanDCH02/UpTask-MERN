import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { Project, TeamMember, TeamMemberForm } from "../types";

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
        const {data} = await api.post(`/projects/${projectId}/team`, {id})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error (error.response.data.error)
        }
    }
}