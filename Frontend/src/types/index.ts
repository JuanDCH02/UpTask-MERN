import { z} from 'zod'

//AUTH 

const AuthSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
})

type Auth = z.infer<typeof AuthSchema>
export type UserLoginForm = Pick<Auth, 'email'|'password'>
export type UserRegistrationForm = Pick<Auth, 'email'|'password'|'name'|'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password'|'password_confirmation'>

//USERS
export const userSchema = AuthSchema.pick({
    name:true,
    email:true
}).extend({
    _id:z.string()
})
export type User = z.infer<typeof userSchema>

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
    manager: userSchema.shape._id,
})

export const DashboardProjectsSchema = z.array(
    ProjectSchema.pick({
        _id:true,
        projectName:true,
        clientName:true,
        description:true,
        tasks:true,
        manager: true,
    })
)
export type Project = z.infer<typeof ProjectSchema>
export type ProjectFormData = Pick<Project, 'projectName' |'clientName'| 'description'>

//TEAM
const teamMemberSchema = userSchema.pick({
    name:true,
    email:true,
    _id:true,
})
export const teamMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>