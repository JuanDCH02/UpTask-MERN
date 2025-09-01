import mongoose, {Schema, Document, PopulatedDoc, Types} from "mongoose";
import { ITask } from "./Task";
import { IUser } from "./User";

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
    manager: {type: Types.ObjectId, ref: 'User'  },
    team: [{type: Types.ObjectId, ref: 'User'  }],
}, {timestamps: true})

const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project;