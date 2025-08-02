import mongoose, {Schema, Document} from "mongoose";

//type TypeScript
export type ProjectType = Document & {
    projectName: string,
    clientName: string,
    description: string
}
//type Mongoose
const ProjectSchema: Schema = new Schema({
    projectName: { type: String, required: true },
    clientName: { type: String, required: true },
    description: { type: String, required: true }
})

const Project = mongoose.model<ProjectType>('Project', ProjectSchema)
export default Project;