import { useAuth } from "@/hooks/useAuth"
import { deleteNote } from "@/services/noteApi"
import type { Note } from "@/types/index"
import { formatDate } from "@/utils/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "sonner"

type NoteDetailProps = {
    note:Note
}

export default function NoteDetail({note} : NoteDetailProps) {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    const params = useParams()
    const projectId = params.projectId!

    const {data, isError} = useAuth()
    const canDelete = useMemo(()=> data?._id === note.createdBy._id, [data])

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn:deleteNote,
        onError:(error)=> {
            toast.error(error.message)
        },
        onSuccess:(data)=> {
            toast.success(data)
            queryClient.invalidateQueries({queryKey:['task', taskId]})
        }
    })

    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} por: 
                    <span className="font-semibold"> {note.createdBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>
            {canDelete && (
                <button type="button"
                className="bg-red-400 hover:bg-red-500 text-white p-2 text-xs
                    text-bold transition-colors"
                    onClick={()=> mutate({projectId, taskId, noteId:note._id})}
                    >eliminar
                </button>
            )}
            
        </div>
    )
}
