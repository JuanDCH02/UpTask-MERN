import type { Project, TaskProject, TaskStatus } from "@/types/index"
import TaskCard from "./TaskCard"
import { statusTranslation } from "@/utils/index"
import DropTask from "./DropTask"
import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateStatusTask } from "@/services/TaskApi"
import { useParams } from "react-router-dom"


    type TaskListProps = {
        tasks: TaskProject[],
        canEdit:boolean 
    }
    type GroupedTasks = {
        [key:string] : TaskProject[]
    }
    const initialStatusGroups : GroupedTasks = {
        pending:[],
        on_hold:[],
        in_progress:[],
        under_review:[],
        completed:[],
    }
    const statusStyles : {[key: string]: string} = {
        pending: 'border-t-slate-500',
        on_hold: 'border-t-orange-500',
        in_progress: 'border-t-cyan-500',
        under_review: 'border-t-yellow-500',
        completed: 'border-t-lime-500',
    }
    

export default function TaskList({tasks, canEdit} : TaskListProps) {
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn:updateStatusTask,
        onError:(error)=> {
            toast.error(error.message)
        },
        onSuccess:(data)=> {
            toast.success(data)
            queryClient.invalidateQueries({queryKey:['project', projectId]}) 
        }
    })
    const handleDragEnd = (e: DragEndEvent) => {
        const {over, active} = e
        if(over && active){
            const taskId = active.id.toString()
            const status = over.id as TaskStatus
            mutate({projectId, taskId, status})

                //update the status task without delay
            queryClient.setQueryData(['project', projectId], (prev : Project)=> {
                const updatedTasks = prev.tasks.map((task)=> {
                    if(task._id === taskId){
                        return{...task, status}
                    }
                    return task
                }) 
                return {...prev, tasks: updatedTasks}
            })
        }
    }

    //group the tasks according to their status
    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    return (
    <>
        <h2 className="text-5xl font-black my-10">Tareas</h2>
        <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
            <DndContext onDragEnd={handleDragEnd} >
            {Object.entries(groupedTasks).map(([status, tasks]) => (
                <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                    <h3 className={`capitalize text-xl font-medium text-gray-700 border border-slate-300
                        bg-white p-3 border-t-8 ${statusStyles[status]}`}
                        >{statusTranslation[status]}
                    </h3> 

                    <DropTask status={status} />

                    <ul className='mt-5 space-y-5'>
                        {tasks.length === 0 ? (
                            <li className="text-gray-500 text-center pt-3">No Hay tareas</li>
                        ) : (
                            tasks.map(task => <TaskCard key={task._id} task={task} canEdit={canEdit} />)
                        )}
                    </ul>
                </div>
            ))}
            </DndContext>
        </div>
    </>
    )
}
