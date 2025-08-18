import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {TaskFormData } from '@/types/index';
import TaskForm from './TaskForm';
import { createTask } from '@/services/TaskApi';
import { toast } from 'sonner';
import { BsClipboard2CheckFill } from 'react-icons/bs';

export default function AddTaskModal() {

    const navigate = useNavigate()
    //get info from mi url
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('newTask')
    //if the param from mi url is 'newTask' shows the modal
    const show = modalTask? true : false

    const initialValues : TaskFormData = {
        taskName:'',
        description:''
    }
    const {register, handleSubmit,reset, formState: {errors} } = useForm({defaultValues:initialValues})

    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createTask,
        onError:(error)=> {
            toast.error(error.message)
        },
        onSuccess:(data, {formData})=> {
            toast(data, {description:formData.taskName, icon:<BsClipboard2CheckFill/>})
            queryClient.invalidateQueries({queryKey:['project', projectId]})
            reset()
        }
    })

    const handleCreateTask = (formData: TaskFormData) => {
        const data = {
            formData, projectId
        }
        mutate(data)
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() =>  navigate('', {replace:true}) }>
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
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                        >Nueva Tarea
                                    </DialogTitle>

                                    <p className="text-xl font-bold">Llena el formulario y crea
                                        <span className="text-fuchsia-600"> una tarea</span>
                                    </p>
                                    <form action="" onSubmit={handleSubmit(handleCreateTask)}
                                    noValidate
                                    className='mt-10 space-y-5'
                                    >
                                        <TaskForm
                                            register={register}
                                            errors={errors}
                                        />

                                        <input type="submit"
                                            value='Crear Tarea'
                                            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white 
                                            uppercase font-bold cursor-pointer transition-colors"
                                        />
                                    </form>

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}