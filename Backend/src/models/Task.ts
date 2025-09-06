import mongoose, {Schema, Document, Types} from "mongoose";

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
    completedBy: Types.ObjectId,
}
//type Mongoose
const TaskSchema: Schema = new Schema({
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    project: { type: Types.ObjectId, ref: 'Project' },
    status: { type: String, enum: Object.values(taskStatus), default: taskStatus.PENDING},
    completedBy: { type: Types.ObjectId, ref: 'User', default: null },
}, {timestamps: true})

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task;