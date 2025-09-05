import type { Project, TeamMember } from "../types"

export function formatDate(str:string){
    const date = new Date(str)
    const formatter = new Intl.DateTimeFormat('es-ES',{
        year:'numeric',
        month:'long',
        day:'numeric'
    })
    return formatter.format(date)
}
export const statusTranslation : {[key: string]: string} = {
    pending: 'Pendiente',
    on_hold: 'En espera',
    in_progress: 'En Proceso',
    under_review: 'Bajo Revisión',
    completed: 'Completada',
}

export const isManager = (managerId:Project['manager'], userId:TeamMember['_id']) => managerId === userId
