import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose";
import Task, { ITask } from "./Task";
import { IUser } from "./User";
import Note from "./Note";

//type TypeScript
export interface IProject extends Document  {
    projectName: string,
    clientName: string,
    description: string,
    tasks: PopulatedDoc<ITask & Document>[]
    manager: PopulatedDoc<IUser & Document>
    team: PopulatedDoc<IUser & Document>[]
}
//type Mongoose
const ProjectSchema: Schema = new Schema({
    projectName: { type: String, required: true },
    clientName: { type: String, required: true },
    description: { type: String, required: true },
    tasks: [{ type: Types.ObjectId, ref: 'Task' }],
    manager: {type: Types.ObjectId, ref: 'User' },
    team: [{type: Types.ObjectId, ref: 'User'  }],
}, {timestamps: true})

//middleware
//delete tasks from a project when its deleted
ProjectSchema.pre('deleteOne', {document:true, query:false}, async function () {
    const projectId = this.id
    if(!projectId) return 

    const tasks = await Task.find({project: projectId})
    for(const task of tasks){
        await Note.deleteMany({task: task.id}) 
    }
    await Task.deleteMany({project: projectId})
})

const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project;