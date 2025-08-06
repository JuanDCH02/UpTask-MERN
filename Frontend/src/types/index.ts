import {z} from 'zod'

//PROJECTS

export const ProjectSchema = z.object({
    id:z.string(),
    projectName:z.string(),
    clientName:z.string(),
    description:z.string(),
})
export type Project = z.infer<typeof ProjectSchema>
export type ProjectFormData = Pick<Project, 'projectName' |'clientName'| 'description'>