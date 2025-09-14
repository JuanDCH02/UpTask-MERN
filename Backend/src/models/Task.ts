import mongoose, {Schema, Document, Types} from "mongoose";
import Note from "./Note";

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'on_hold',
    IN_PROGRESS: 'in_progress',
    UNDER_REVIEW: 'under_review',
    COMPLETED: 'completed',
} as const;

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus];

//type TypeScript
export interface ITask extends Document  {
    taskName: string,
    description: string,
    project: Types.ObjectId,
    status: TaskStatus,
    completedBy: {
        user: Types.ObjectId,
        status: TaskStatus
    }[],
    notes: Types.ObjectId[]
}
//type Mongoose
const TaskSchema: Schema = new Schema({
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    project: { type: Types.ObjectId, ref: 'Project' },
    status: { type: String, enum: Object.values(taskStatus), default: taskStatus.PENDING },
    completedBy: [ 
        {
            user: { type: Types.ObjectId, ref: 'User', default: null },
            status: { type: String, enum: Object.values(taskStatus), default: taskStatus.PENDING }
        }
    ],
    notes: [ { type: Types.ObjectId, ref:'Note' } ]
}, {timestamps: true})

//middleware
//delete notes from a task when its deleted
TaskSchema.pre('deleteOne', {document:true, query:false}, async function () {
    const taskId = this.id
    if(!taskId) return 
    await Note.deleteMany({task: taskId})
})

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task;