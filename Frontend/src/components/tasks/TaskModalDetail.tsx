import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskbyId, updateStatusTask } from '@/services/TaskApi';
import NotesPanel from '../notes/NotesPanel';
import { toast } from 'sonner';
import { formatDate } from '@/utils/index';
import { statusTranslation } from '@/utils/index';
import type { TaskStatus } from '@/types/index';

export default function TaskModalDetails() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const params = useParams()
    const projectId = params.projectId!
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    const showModal = !!taskId

    
    const {data, isError, error} = useQuery({
        queryKey:['task', taskId],
        queryFn:()=> getTaskbyId({projectId, taskId}),
        enabled:!!taskId,
        retry:false
    })
    const {mutate} = useMutation({
        mutationFn:updateStatusTask,
        onError:(error)=> {
            toast.error(error.message)
        },
        onSuccess:(data)=> {
            toast.success(data)
            queryClient.invalidateQueries({queryKey:['project', projectId]})
            queryClient.invalidateQueries({queryKey:['task', taskId]})
        }
    })
    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus
        const data = { projectId, taskId, status}
        mutate(data)
    }
    if(isError){
        toast.error(error.message)
        return <Navigate to={''} />
    }
  
    if(data) return (
        <>
        <Transition appear show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate('', {replace:true})}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)}</p>
                                <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)}</p>
                                <DialogTitle
                                    as="h3"
                                    className="font-black text-4xl text-slate-600 my-5"
                                    >{data.taskName}
                                </DialogTitle>
                                <p className='text-lg text-slate-600 mb-2'>Descripción: {data.description}</p>

                                {data.completedBy.length ? (
                                    <>
                                        <p className='text-2xl mb-2 italic'>Historial de cambios</p>
                                        <ul className='list-decimal text-slate-600 font-semibold'>
                                        {data.completedBy.map(task => (
                                            <li key={task._id}>
                                                <span>
                                                    {statusTranslation[task.status]} -
                                                </span> {task.user.name}
                                            </li>
                                        ))}
                                        </ul>
                                    </>
                                ):''}
                                <div className='my-5 space-y-3'>
                                    <label className='font-bold'>Estado Actual:</label>
                                    <select name="" id=""
                                    defaultValue={data.status}
                                    onChange={handleChange}
                                    className='mt-1 block w-full p-2 rounded border border-gray-400'>
                                        {Object.entries(statusTranslation).map(
                                            status =>(
                                                <option value={status[0]} key={status[0]}
                                                    className=''
                                                    >{status[1]}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>

                                <NotesPanel/>

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
        </>
    )
}