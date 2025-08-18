import { z} from 'zod'

//TASKS

export const taskStatusSchema = z.enum(["pending" , "on_hold" , "in_progress" ,
    "under_review" , "completed"])

export type TaskStatus = z.infer<typeof taskStatusSchema>

export const TaskSchema = z.object({
    _id:z.string(),
    taskName:z.string(),
    description:z.string(),
    project:z.string(),
    status:taskStatusSchema,
    createdAt:z.string(),
    updatedAt:z.string(),
})

export type Task = z.infer<typeof TaskSchema>
export type TaskFormData = Pick<Task, 'taskName' |'description'>

//PROJECTS

export const ProjectSchema = z.object({
    _id:z.string(),
    projectName:z.string(),
    clientName:z.string(),
    description:z.string(),
    tasks: z.array(TaskSchema),
})

export const DashboardProjectsSchema = z.array(
    ProjectSchema.pick({
        _id:true,
        projectName:true,
        clientName:true,
        description:true,
        tasks:true
    })
)
export type Project = z.infer<typeof ProjectSchema>
export type ProjectFormData = Pick<Project, 'projectName' |'clientName'| 'description'>