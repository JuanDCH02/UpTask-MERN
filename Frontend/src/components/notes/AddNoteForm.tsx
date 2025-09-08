import { useForm } from "react-hook-form"
import type { NoteFormData } from "@/types/index"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/services/noteApi"
import { toast } from "sonner"
import { FaPenAlt } from 'react-icons/fa';
import { useLocation, useParams } from "react-router-dom"

export default function AddNoteForm() {

    const initialValues = {
        content: ''
    }
    const params = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const taskId = queryParams.get('viewTask')!
    const projectId = params.projectId!

    const {register, reset, handleSubmit, formState:{errors}} =useForm({defaultValues: initialValues})
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createNote,
        onError:(error) => {
            toast.error(error.message)
        },
        onSuccess:(data) => {
            queryClient.invalidateQueries({queryKey:['task', taskId]})
            toast(data, {icon:<FaPenAlt/>}) 
            reset()
        }
    })
    const handleAddNote = (formData: NoteFormData)=> {
        mutate({projectId, taskId, formData})
    }

    return (
        <form className="space-y-3"
            noValidate 
            onSubmit={handleSubmit(handleAddNote)}
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="content" className="font-bold">Crear nota</label>
                <input type="text" id="content"
                    className="w-full p-3 border border-gray-300"
                    placeholder="contenido de la nota"
                    {...register('content',{
                        required:'El contenido de la nota es obligatorio'
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>
            <input type="submit"
                value='Crear nota'
                className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white cursor-pointer
                w-full p-2 font-black"
            />

        </form>
    )
}
